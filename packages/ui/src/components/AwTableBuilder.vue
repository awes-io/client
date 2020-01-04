<template>
    <div class="relative">
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

        <!-- loading placeholder -->
        <AwTable
            v-else-if="collection.loading"
            key="placeholder"
            :rows="placeholderRows"
            style="filter: blur(2px);"
        >
            <template #thead>
                <AwTableHead
                    :columns="[
                        { text: $t('AwTableBuilder.loading'), align: 'center' }
                    ]"
                />
            </template>
            <AwTableCol title>
                <template #default>
                    <span class="block h-4"></span>
                </template>
            </AwTableCol>
        </AwTable>

        <!-- pagination -->
        <AwPagination v-if="total !== null" :total="total" class="mt-4" />

        <!-- loading overlay -->
        <div
            v-if="collection.loading"
            class="absolute inset-0 flex items-center justify-center"
        >
            <div class="absolute inset-0 p-8 bg-surface opacity-50"></div>
            <slot name="loading">
                <span class="h2 relative">
                    {{ $t('AwTableBuilder.loading') }}
                </span>
            </slot>
        </div>
    </div>
</template>

<script>
import { pathOr } from 'rambdax'
import { mergeRouteQuery } from '~/assets/js/router'
import { AwTable as config } from './_config'

export default {
    name: 'AwTableBuilder',

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

        watchParams: {
            type: Array,
            default: null
        },

        scrollOnPage: {
            type: Boolean,
            default: true
        },

        verticalAlign: {
            type: String,
            default: 'middle',
            validator(value) {
                return config.valignValues.includes(value)
            }
        }
    },

    data() {
        return {
            total: null
        }
    },

    computed: {
        page() {
            return Number(this.$route.query.page || 1)
        },

        limit() {
            return Number(this.$route.query.limit || 15)
        },

        items() {
            return this.collection.models
        },

        placeholderRows() {
            return [...Array(this.limit).keys()].map(() => ({}))
        },

        fetchQuery() {
            const params = {
                page: this.page,
                limit: this.limit
            }

            if (this.watchParams) {
                this.watchParams.forEach(name => {
                    const value = this.$route.query[name]
                    if (value) {
                        params[name] = value
                    }
                })
            }

            return params
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
            const unwatchers = []

            this.$once('hook:beforeDestroy', () => {
                unwatchers.forEach(unwatch => {
                    unwatch()
                })
            })

            this.watchParams.forEach(param => {
                const unwatcher = this.$watch(
                    `$route.query.${param}`,
                    this._fetchFromWatcher
                )
                unwatchers.push(unwatcher)
            })

            this.collection.on('delete', this._fetchOnDelete)
        }
    },

    methods: {
        fetch() {
            this.collection
                .fetch({ params: this.fetchQuery })
                .then(this._setTotal)
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

        _setTotal(fetched) {
            const total = pathOr(null, 'response.data.meta.total', fetched)
            this.total = total
        },

        _scrollTop() {
            if (!this.scrollOnPage) return

            const table = this.$refs.table.$el
            const sizes = table.getBoundingClientRect()

            if (sizes.y < 0) {
                table.scrollIntoView({
                    behavior: 'smooth'
                })
            }
        }
    }
}
</script>
