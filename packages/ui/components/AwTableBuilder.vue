<template>
    <div class="relative">
        <div v-if="isEmpty && !collection.loading">
            <!-- Empty container, your can compleatly overwrite the block. -->
            <slot name="empty-container">
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
                            <div class="text-disabled mb-4">
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
        </div>

        <!-- table -->
        <AwTable
            v-if="items && items.length"
            ref="table"
            key="table"
            :rows="items"
            :style="collection.loading ? 'filter: blur(2px);' : null"
            :vertical-align="verticalAlign"
            v-on="tableListeners"
        >
            <template #thead="{ thead }">
                <slot name="thead" :thead="thead" />
            </template>

            <slot />
        </AwTable>

        <div v-else-if="collection.loading" key="empty-loading-container">
            <!-- Empty loading container -->
            <slot name="empty-loading-container">
                <!-- Empty AwCard block -->
                <AwCard
                    class="flex items-center justify-center min-h-full mb-5"
                    :class="`h-${defaultHeight}`"
                >
                </AwCard>
            </slot>
        </div>

        <!-- pagination -->
        <AwPagination
            v-if="pagination.total !== null && !isEmpty"
            v-bind="pagination"
            :page="page"
            :limits="limitsMerged"
            :arrow-nav="arrowNav"
            @click:page="page = $event"
            @click:limit="limit = $event"
            class="mt-4"
        />

        <!-- Loading overlay -->
        <div
            v-if="collection.loading"
            class="absolute inset-0 flex items-center justify-center"
        >
            <div class="absolute inset-0 p-8 bg-surface opacity-50"></div>
            <!-- Customization of loading block -->
            <slot name="loading">
                <!-- Default loading block -->
                <AwChip class="bgcolor-muted-dark">
                    <AwSvgImage name="spinner" slot="left" class="h-5 w-5" />
                    {{ $t('AwTableBuilder.loading') }}
                </AwChip>
            </slot>
        </div>
    </div>
</template>

<script>
import { pathOr, filter } from 'rambdax'
import { mergeRouteQuery } from '../assets/js/router'
import { TABLE_ROW_CLICK_EVENT } from '../assets/js/constants'
import AwCard from './AwCard.vue'
import AwChip from './AwChip.vue'
import AwSvgImage from './AwSvgImage.vue'
import AwPagination from './AwPagination.vue'
import WatchParams from '../mixins/watch-params'

const DEFAULT_LIMITS = [15, 50, 100]

export default {
    name: 'AwTableBuilder',

    mixins: [WatchParams],

    components: {
        AwCard,
        AwChip,
        AwSvgImage,
        AwPagination
    },

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
                return arr.every(el => typeof el === 'number')
            }
        },

        scrollOnPage: {
            type: Boolean,
            default: true
        },

        verticalAlign: String,

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
        }
    },

    data() {
        return {
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

        items() {
            return this.collection.models
        },

        isEmpty() {
            return this.collection.models.length === 0
        },

        placeholderRows() {
            return [...Array(this.limit).keys()].map(() => ({}))
        },

        fetchAllQuery() {
            return {
                page: this.page,
                limit: this.limit,
                ...this.fetchQuery()
            }
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
        }
    },

    watch: {
        page: {
            handler(newVal, oldVal) {
                if (oldVal && this.scrollOnPage) {
                    this._scrollTop()
                }
                this.fetch()
            },
            immediate: true
        },

        limit() {
            if (this.scrollOnPage) {
                this._scrollTop()
            }
            this.fetch()
        }
    },

    created() {
        if (this.watchParams) {
            this.collection.on('delete', this._fetchOnDelete)
        }
    },

    methods: {
        fetch(params = {}) {
            this.collection
                .fetch({ params: { ...this.fetchAllQuery, ...params } })
                .then(this._setPagination)
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
        }
    }
}
</script>
