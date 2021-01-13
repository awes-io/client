<template>
    <div class="relative">
        <div v-if="isEmpty && !collection.loading">
            <!-- The empty container. Will be shown if the data (without filters) is empty. Your can compleatly overwrite the block. -->
            <slot v-if="!isWatchParamsPresent" name="empty-container">
                <!-- Block with icon, headline and slot for button. -->
                <AwCard
                    class="flex items-center justify-center min-h-full mb-5"
                    :class="`h-${defaultHeight}`"
                >
                    <div class="text-center">
                        <!-- Icon customization. Leave empty if you would like to remove. -->
                        <slot name="empty-icon">
                            <!-- Empty SVG icon -->
                            <AwSvgImage
                                name="empty"
                                class="block m-auto mb-4"
                            />
                        </slot>

                        <!-- Headline customization in the empty block -->
                        <slot name="empty-title">
                            <!-- Text: "There are no data to show" -->
                            <div class="text-mono-400 mb-4">
                                {{ $t('AwTableBuilder.empty') }}
                            </div>
                        </slot>

                        <!-- You can use the slot to add a button or else -->
                        <slot name="empty-button">
                            <!-- `Empty` -->
                        </slot>
                    </div>
                </AwCard>
            </slot>

            <!-- The empty container if filtered response is empty. Your can compleatly overwrite the block. Shows when watch params is present un url -->
            <slot v-if="isWatchParamsPresent" name="empty-filter-container">
                <!-- Block with icon, headline and slot for button. -->
                <AwCard
                    class="flex items-center justify-center min-h-full mb-5"
                    :class="`h-${defaultHeight}`"
                >
                    <div class="text-center">
                        <!-- Icon customization. Leave empty if you would like to remove. -->
                        <slot name="empty-filter-icon">
                            <!-- Empty SVG icon -->
                            <AwSvgImage
                                name="empty"
                                class="block m-auto mb-4"
                            />
                        </slot>

                        <!-- Headline customization in the empty filter block -->
                        <slot name="empty-filter-title">
                            <!-- Text: "There are no data to show" -->
                            <div class="text-mono-400 mb-4">
                                {{ $t('AwTableBuilder.emptyFilter') }}
                            </div>
                        </slot>

                        <!-- You can use the slot to add a button or else -->
                        <slot name="empty-filter-button">
                            <!-- `Empty` -->
                        </slot>
                    </div>
                </AwCard>
            </slot>
        </div>

        <ul
            v-if="$scopedSlots.list"
            :style="collection.loading ? 'filter: blur(3px);' : null"
            class="list-none"
        >
            <li v-for="item in items" :key="item.id">
                <slot name="list" v-bind:item="item"></slot>
            </li>
        </ul>

        <!-- table -->
        <AwTable
            v-if="items && items.length && !$scopedSlots.list"
            ref="table"
            key="table"
            :rows="items"
            :style="collection.loading ? 'filter: blur(3px);' : null"
            :vertical-align="verticalAlign"
            :orderable="orderable"
            v-on="tableListeners"
            @click:head="onTheadClick"
        >
            <template #thead="{ thead }">
                <slot name="thead" :thead="thead" />
            </template>

            <slot />

            <AwTableCol
                v-if="$slots.dropdown || $scopedSlots.dropdown"
                class="w-20 lg:w-24"
                :priority="1"
            >
                <template #default="{ cell }">
                    <AwContextMenu>
                        <slot name="dropdown" :cell="cell"></slot>
                    </AwContextMenu>
                </template>
            </AwTableCol>
        </AwTable>

        <div
            v-else-if="collection.loading && !$scopedSlots.list"
            key="empty-loading-container"
        >
            <!-- Empty loading container -->
            <slot name="empty-loading-container">
                <!-- Empty AwCard block -->
                <div
                    class="flex items-center justify-center min-h-full mb-5"
                    :class="`h-${defaultHeight}`"
                ></div>
            </slot>
        </div>

        <AwButton
            v-if="infiniteScroll && !isLastPage"
            color="default"
            size="lg"
            class="mt-3 w-full"
            @click="fetchMore()"
        >
            Load more
        </AwButton>

        <AwButton
            v-if="mixed && !isLastPage"
            color="default"
            size="lg"
            class="mt-3 w-full"
            @click="onPageClick(page + 1, false)"
        >
            Load more
        </AwButton>

        <!-- pagination -->
        <AwPagination
            v-if="pagination.total !== null && !isEmpty && !infiniteScroll"
            v-bind="pagination"
            :page="page"
            :limits="limitsMerged"
            :arrow-nav="arrowNav"
            @click:page="onPageClick($event, true)"
            @click:limit="limit = $event"
            class="mt-3 lg:mt-8"
        />

        <!-- Loading overlay -->
        <div
            v-if="collection.loading"
            class="absolute inset-0 flex items-center justify-center"
            :class="`h-${defaultHeight}`"
        >
            <!-- Customization of loading block -->
            <slot name="loading">
                <!-- Default loading block -->
                <AwChip class="bg-mono-300">
                    <AwSvgImage name="spinner" slot="left" class="h-5 w-5" />
                    {{ $t('AwTableBuilder.loading') }}
                </AwChip>
            </slot>
        </div>
    </div>
</template>

<script>
import { pathOr, filter, mergeDeepRight, isType } from 'rambdax'
import { mergeRouteQuery } from '@AwUtils/router'
import {
    TABLE_ROW_CLICK_EVENT,
    TABLE_HEAD_CLICK_EVENT,
    TABLE_DATA_FETCHED
} from '@AwUtils/constants'
import WatchParams from '@AwMixins/watch-params'
import unmaskParams from '@AwUtils/unmask-param'

const DEFAULT_LIMITS = [15, 50, 100]

export default {
    name: 'AwTableBuilder',

    mixins: [WatchParams],

    props: {
        collection: {
            type: Object,
            required: true,
            validator(obj) {
                return (
                    Array.isArray(obj.models) &&
                    typeof obj.fetch === 'function' &&
                    typeof obj.on === 'function'
                )
            }
        },

        pageParam: {
            type: String,
            default: 'page'
        },

        limitParam: {
            type: String,
            default: 'limit'
        },

        limits: {
            type: Array,
            default: () => DEFAULT_LIMITS,
            validator(arr) {
                return arr.every((el) => typeof el === 'number')
            }
        },

        scrollOnPage: {
            type: Boolean,
            default: true
        },

        verticalAlign: String,

        // Indicates if infinity scroll enabled
        infiniteScroll: Boolean,

        // If true enable both pagination and infinity scroll
        mixed: Boolean,

        // Size of the empty block, e.g loading block or empty block.
        defaultHeight: {
            type: String,
            default: '50vh',
            validator(value) {
                return ['10vh', '30vh', '50vh', '70vh'].includes(value)
            }
        },

        /**
         * Should the page being switched on
         * `CTRL + <-` and  `CTRL + ->`
         */
        arrowNav: {
            type: Boolean,
            default: true
        },

        /**
         * Orderable config that will be merged with global orderable config.
         * If null then global orderable config will be used
         */
        orderable: {
            type: Object,
            default: null
        },

        /**
         * Disable auto fetching collection on mount
         */
        noFetch: Boolean
    },

    data() {
        return {
            defaultCol: null,
            isResetPage: true,
            pagination: {
                total: null,
                limit: DEFAULT_LIMITS[0]
            }
        }
    },

    computed: {
        page: {
            get() {
                return Number(this.$route.query[this.pageParam] || 1)
            },

            set(val) {
                this.$router.replace(
                    mergeRouteQuery(
                        {
                            [this.pageParam]: val === 1 ? null : String(val)
                        },
                        this.$route
                    )
                )
            }
        },

        limit: {
            get() {
                return Number(
                    this.$route.query[this.limitParam] || DEFAULT_LIMITS[0]
                )
            },

            set(val) {
                const limit =
                    parseInt(val) === this.limits[0] ? null : String(val)

                this.$router.replace(
                    mergeRouteQuery(
                        {
                            [this.pageParam]: null,
                            [this.limitParam]: limit
                        },
                        this.$route
                    )
                )
            }
        },

        isLastPage() {
            return (
                this.collection.models.length === this.pagination.total ||
                this.page * this.limit >= this.pagination.total
            )
        },

        items() {
            return this.collection.models
        },

        isEmpty() {
            return this.collection.models.length === 0
        },

        isWatchParamsPresent() {
            if (!this.watchParams || !this.watchParams.length) {
                return false
            }
            return this.watchParams.some((el) => !!this.$route.query[el])
        },

        placeholderRows() {
            return [...Array(this.limit).keys()].map(() => ({}))
        },

        fetchAllQuery() {
            const params = {
                page: this.page,
                limit: this.limit,
                ...this.fetchQuery()
            }

            const orderableParam = this._currentOrderableConfig.param
            if (this.$route.query[orderableParam]) {
                params[orderableParam] = this.$route.query[orderableParam]
            } else if (this.defaultCol) {
                const template = pathOr(
                    this._currentOrderableConfig.ascTemplate,
                    'componentOptions.propsData.orderable.ascTemplate',
                    this.defaultCol
                )
                params[orderableParam] = unmaskParams(
                    template,
                    this.defaultCol.componentOptions.propsData.field
                )
            }

            return params
        },

        limitsMerged() {
            return this.limits.includes(this.pagination.limit)
                ? this.limits
                : this.limits
                      .concat(this.pagination.limit)
                      .sort((a, b) => a > b)
        },

        tableListeners() {
            return filter((val, key) => {
                return key === TABLE_ROW_CLICK_EVENT
            }, this.$listeners)
        },

        _currentOrderableConfig() {
            return mergeDeepRight(
                pathOr({}, '$awesConfig.AwTableBuilder', this),
                pathOr({}, 'orderable', this)
            )
        }
    },

    watch: {
        page: {
            handler(newVal, oldVal) {
                if (oldVal && this.scrollOnPage) {
                    this._scrollTop()
                }
                this.fetch()
            }
        },

        limit() {
            if (this.scrollOnPage) {
                this._scrollTop()
            }
            this.fetch()
        }
    },

    created() {
        this.defaultCol = this._getDefaultCol()

        if (this.watchParams) {
            this.collection.on('delete', this._fetchOnDelete)
        }

        // Replace default methods with table buider params
        let _oldGetFetchQuery = this.collection.getFetchQuery
        let _oldOnFetchFuccess = this.collection.onFetchSuccess
        let _oldIsPaginated = this.collection.isPaginated

        this.collection.getFetchQuery = () => ({
            ..._oldGetFetchQuery(),
            ...this.fetchAllQuery
        })

        this.collection.onFetchSuccess = (response) => {
            this._setPagination(response)
            if (isType('Function', _oldOnFetchFuccess)) {
                _oldOnFetchFuccess(response)
            }
        }

        this.collection.isPaginated = () => this.infiniteScroll

        this.$once('hook:beforeDestroy', () => {
            this.collection.getFetchQuery = _oldGetFetchQuery
            this.collection.onFetchSuccess = _oldOnFetchFuccess
            this.collection.isPaginated = _oldIsPaginated
            _oldGetFetchQuery = null
            _oldOnFetchFuccess = null
            _oldIsPaginated = null
        })

        // Initial fetch
        !this.noFetch && this.fetch()
    },

    methods: {
        fetch(params = {}) {
            return this.collection.fetch({ params }).then((response) => {
                // Trigers every time when data fetched. Emits full response
                this.$emit(TABLE_DATA_FETCHED, response)
                return response
            })
        },

        fetchMore() {
            const page = this.collection.models.length / this.limit
            this.collection
                .page(1)
                .fetch({
                    params: {
                        ...this.fetchAllQuery,
                        page: page + 1
                    }
                })
                .then((response) => {
                    this.$emit(TABLE_DATA_FETCHED, response)
                    return response
                })
                .then(this._setPagination)
        },

        onTheadClick(col) {
            const orderable = col.orderable
            this.$emit(TABLE_HEAD_CLICK_EVENT, col)
            if (orderable) {
                const isAskValPresent =
                    this.$route.query[orderable.param] === orderable.ascValue
                const isDescValPresent =
                    this.$route.query[orderable.param] === orderable.descValue

                let paramValue = null

                if (isAskValPresent || this._isColDefault(col)) {
                    paramValue = orderable.descValue
                } else {
                    if (!isDescValPresent) {
                        paramValue = orderable.ascValue
                    } else if (this.defaultCol) {
                        console.log(this.defaultCol)
                        const template = pathOr(
                            this._currentOrderableConfig.ascTemplate,
                            'componentOptions.propsData.orderable.ascTemplate',
                            this.defaultCol
                        )
                        paramValue = unmaskParams(
                            template,
                            this.defaultCol.componentOptions.propsData.field
                        )
                    }
                }

                this.$router.replace(
                    mergeRouteQuery(
                        {
                            [orderable.param]: paramValue
                        },
                        this.$route
                    )
                )
                this.fetch({ [orderable.param]: paramValue })
            }
        },

        onPageClick(page, reset = true) {
            this.isResetPage = reset
            this.page = page
        },

        _isColDefault(col) {
            const isParamPresent =
                Object.keys(this.$route.query).indexOf(col.orderable.param) > -1
            return !isParamPresent && col.orderable.default
        },

        /**
         * Resets page if it is not first or simply doing fetch otherwise
         */
        _fetchFromWatcher() {
            if (this.page !== 1) {
                this.$router.push(mergeRouteQuery({ page: null }, this.$route))
            } else {
                this.fetch()
            }
        },

        _fetchOnDelete() {
            if (this.items && !this.items.length && this.page > 1) {
                const page = this.page > 2 ? this.page - 1 : null
                this.$router.push(mergeRouteQuery({ page }, this.$route))
            }
            this.fetch()
        },

        _setPagination(fetched) {
            const total = pathOr(null, 'response.data.meta.total', fetched)
            const limit = pathOr(
                DEFAULT_LIMITS[0],
                'response.data.meta.per_page',
                fetched
            )

            if (this.limit !== limit) {
                this.limit = limit
            }

            this.pagination = { total, limit }
        },

        _scrollTop() {
            if (this.$isServer) return

            const table = this.$el
            const { y = 0 } = table.getBoundingClientRect()
            const toTop = window.pageYOffset + y

            if (toTop < window.innerHeight) {
                document.body.scrollIntoView({
                    behavior: 'smooth'
                })
            } else if (y < 0) {
                table.scrollIntoView({
                    behavior: 'smooth'
                })
            }
        },

        _getDefaultCol() {
            if (!this.$slots.default) {
                return null
            }
            const filtered = this.$slots.default.filter((el) =>
                pathOr(
                    false,
                    'componentOptions.propsData.orderable.default',
                    el
                )
            )
            return filtered.length ? filtered[0] : null
        }
    }
}
</script>
