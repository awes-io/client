<template>
    <div class="relative">
        <div v-if="isEmpty && !collection.loading">
            <!-- empty overlay -->
            <slot name="empty-container">
                <AwCard
                    :class="
                        `flex items-center justify-center h-block-${defaultHeight} min-h-full mb-5`
                    "
                >
                    <div class="text-center">
                        <slot name="empty-icon">
                            <AwSvgImage
                                name="empty"
                                class="block m-auto mb-4"
                            />
                        </slot>
                        <slot name="empty-title">
                            <div class="text-disabled mb-4">
                                {{ $t('AwTableBuilder.empty') }}
                            </div>
                        </slot>
                        <slot name="empty-button"></slot>
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
            @click:row="$emit('click:row', $event)"
        >
            <template #thead="{ thead }">
                <slot name="thead" :thead="thead" />
            </template>

            <slot />
        </AwTable>

        <div v-else-if="collection.loading">
            <!-- Empty loading container -->
            <slot name="empty-loading-container">
                <AwCard
                    :class="
                        `flex items-center justify-center h-block-${defaultHeight} min-h-full mb-5`
                    "
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
                <div class="rounded-full py-2 pl-3 pr-5 relative bg-muted-dark">
                    <AwSvgImage
                        name="spinner"
                        class="inline-block w-6 h-6 mr-2"
                    />
                    {{ $t('AwTableBuilder.loading') }}
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
import { pathOr } from 'rambdax'
import { mergeRouteQuery } from '../assets/js/router'
import AwTableHead from './AwTableHead.vue'
import AwCard from './AwCard.vue'
import AwSvgImage from './AwSvgImage.vue'
import WatchParams from '../mixins/watch-params'

const DEFAULT_LIMITS = [15, 50, 100]

export default {
    name: 'AwTableBuilder',

    mixins: [WatchParams],

    components: {
        AwTableHead,
        AwCard
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

        // Size of the empty block, e.g loading block or empty block. Available: sm, md, lg, xl
        defaultHeight: {
            type: String,
            default: 'lg'
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
        }
    },

    watch: {
        page: {
            handler: 'fetch',
            immediate: true
        },

        limit: 'fetch'
    },

    created() {
        if (this.watchParams) {
            this.collection.on('delete', this._fetchOnDelete)
        }
    },

    methods: {
        fetch(params) {
            this.collection
                .fetch({ params: { ...this.fetchAllQuery, ...params } })
                .then(this._setPagination)
                .then(this._scrollTop)
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
            if (!this.scrollOnPage) return

            const table = this.$refs.table.$el
            const sizes = table ? table.getBoundingClientRect() : { y: 0 }

            if (sizes.y < 0) {
                table.scrollIntoView({
                    behavior: 'smooth'
                })
            }
        }
    }
}
</script>
