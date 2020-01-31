<template>
    <div v-if="pagesTotal > 1" class="flex items-center">
        <!-- info text -->
        <span class="flex-1 text-sm opacity-50 hidden lg:block">{{
            $t('AwPagination.info', {
                ...itemsRange,
                total
            })
        }}</span>

        <!-- pagination -->
        <div
            class="flex-grow flex justify-between lg:justify-center items-center"
            @click="_onPageClick"
        >
            <button
                :data-page="prevPage"
                :disabled="prevPage === null"
                :class="{ 'opacity-50 cursor-default': prevPage === null }"
                class="bg-surface p-3 leading-none shadow-md rounded lg:bgcolor-transparent lg:shadow-none mr-1 focus:outline-none"
            >
                <AwIcon name="arrow-l" />
            </button>

            <span class="lg:hidden">
                {{ $t('AwPagination.page', { page, pagesTotal }) }}
            </span>
            <div class="hidden lg:block py-1 pr-1 bg-muted-dark rounded-lg">
                <Component
                    v-for="({ component, text }, i) in pageButtons"
                    :is="component"
                    :key="`${i}-${text}`"
                    :data-page="component === 'button' ? text : null"
                    :class="{ 'bg-surface shadow': text === page }"
                    class="px-2 py-1 text-center rounded min-w-8 ml-1 focus:outline-none"
                >
                    {{ text }}
                </Component>
            </div>

            <button
                :data-page="nextPage"
                :disabled="nextPage === null"
                :class="{ 'opacity-50 cursor-default': nextPage === null }"
                class="bg-surface p-3 leading-none shadow-md rounded lg:bgcolor-transparent lg:shadow-none ml-1 focus:outline-none"
            >
                <AwIcon name="arrow-r" />
            </button>
        </div>

        <!-- limit -->
        <div class="flex-1 hidden lg:block">
            <div class="flex justify-end">
                <template v-if="limits">
                    <button
                        class="opacity-50 text-sm hover:opacity-100 focus:opacity-100 focus:outline-none"
                        @click="limitsOpened = true"
                    >
                        {{ limit }}
                        <AwIcon
                            name="triangle-d"
                            class="transition-200"
                            :class="{ 'rotate-180': limitsOpened }"
                        />
                    </button>
                    <AwDropdown
                        :show.sync="limitsOpened"
                        class="w-32"
                        :options="{
                            placement: 'bottom-end',
                            modifiers: {
                                preventOverflow: { enabled: false },
                                hide: { enabled: false }
                            }
                        }"
                        close-on-action
                    >
                        <AwGrid :gap="0">
                            <AwButton
                                v-for="_limit in limits"
                                :key="_limit"
                                :active="_limit === limit"
                                theme="toggle"
                                class="w-full text-left"
                                @click="$emit('click:limit', _limit)"
                            >
                                {{ _limit }}
                            </AwButton>
                        </AwGrid>
                    </AwDropdown>
                </template>
                <span v-else class="text-sm opacity-50">
                    {{ $t('AwPagination.limit', { limit }) }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { isNil, range } from 'rambdax'

export default {
    name: 'AwPagination',

    props: {
        /**
         * Total number of items
         */
        total: {
            type: Number,
            required: true
        },

        /**
         * Current page
         */
        page: {
            type: Number,
            default: 1
        },

        /**
         * Limit of items per page
         */
        limit: {
            type: Number,
            required: true
        },

        /**
         * Default limit variants
         */
        limits: {
            type: Array,
            default: null
        }
    },

    data() {
        return {
            limitsOpened: false
        }
    },

    computed: {
        pageButtons() {
            return this.pages.map(this._getButtonProps)
        },

        pagesTotal() {
            return Math.ceil(this.total / this.limit)
        },

        pages() {
            if (this.pagesTotal < 9) {
                return range(1, this.pagesTotal + 1)
            } else {
                const current = this.page
                const last = this.pagesTotal

                if (current < 6) {
                    return [...range(1, 7), null, last]
                } else if (last - current < 5) {
                    return [1, null, ...range(last - 5, last + 1)]
                } else {
                    return [
                        1,
                        null,
                        ...range(current - 2, current + 2),
                        null,
                        last
                    ]
                }
            }
        },

        nextPage() {
            const next = this.page + 1
            return next < this.pagesTotal + 1 ? next : null
        },

        prevPage() {
            const prev = this.page - 1
            return prev > 0 ? prev : null
        },

        itemsRange() {
            const index = this.page
            const lastItem = index * this.limit

            return {
                from: (index - 1) * this.limit + 1,
                to: lastItem < this.total ? lastItem : this.total
            }
        }
    },

    methods: {
        _getButtonProps(page) {
            if (!isNil(page)) {
                return {
                    component: 'button',
                    text: page
                }
            } else {
                return { component: 'span', text: '...' }
            }
        },

        _onPageClick($event) {
            let target = $event.target

            if (target && !target.hasAttribute('data-page')) {
                target = target.closest('[data-page]')
            }

            if (!target) return

            this.$emit('click:page', parseInt(target.getAttribute('data-page')))
        }
    }
}
</script>
