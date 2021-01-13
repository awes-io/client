<template>
    <div v-if="pagesTotal > 1" class="flex items-center lg:px-6">
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
            <AwButton
                :data-page="prevPage"
                :disabled="prevPage === null"
                color="default"
                class="mr-1 lg:hidden"
                content-class="p-3"
            >
                <AwIconSystemMono name="arrow" size="16" />
            </AwButton>
            <AwButton
                :data-page="prevPage"
                :disabled="prevPage === null"
                theme="icon"
                size="sm"
                class="hidden lg:inline-flex mr-1"
            >
                <AwIconSystemMono name="arrow" size="16" />
            </AwButton>

            <span class="lg:hidden">
                {{ $t('AwPagination.page', { page, pagesTotal }) }}
            </span>
            <div class="hidden lg:inline-flex aw-button-nav py-1">
                <Component
                    v-for="({ component, text }, i) in pageButtons"
                    :is="component"
                    :key="`${i}-${text}`"
                    :data-page="component === 'button' ? text : null"
                    :class="{
                        'aw-button-nav__toggler_active': text === page,
                        'aw-button-nav__toggler_disabled':
                            component !== 'button'
                    }"
                    class="aw-button-nav__toggler"
                >
                    <span class="w-8 h-8" tabindex="-1">
                        {{ text }}
                    </span>
                </Component>
            </div>

            <AwButton
                :data-page="nextPage"
                :disabled="nextPage === null"
                theme="icon"
                size="sm"
                class="hidden lg:inline-flex ml-1"
            >
                <AwIconSystemMono name="arrow" rotate="180" size="16" />
            </AwButton>
            <AwButton
                :data-page="nextPage"
                :disabled="nextPage === null"
                color="default"
                class="ml-1 lg:hidden"
                content-class="p-3"
            >
                <AwIconSystemMono name="arrow" rotate="180" size="16" />
            </AwButton>
        </div>

        <!-- limit -->
        <div class="flex-1 hidden lg:block">
            <div class="flex justify-end">
                <template v-if="limits">
                    <AwButton
                        theme="toggle"
                        content-class="p-0"
                        @click="limitsOpened = !limitsOpened"
                    >
                        {{ limit }}
                        <AwIconSystemMono
                            name="triangle"
                            class="inline transition-200"
                            :class="{ 'rotate-180': limitsOpened }"
                        />
                    </AwButton>
                    <AwDropdown
                        ref="limits"
                        :show.sync="limitsOpened"
                        class="w-32"
                        :options="{ placement: 'bottom-end' }"
                    >
                        <AwDropdownButton
                            v-for="_limit in limits"
                            :key="_limit"
                            :active="_limit === limit"
                            @click="$emit('click:limit', _limit)"
                        >
                            {{ _limit }}
                        </AwDropdownButton>
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
        },

        /**
         * Should the page being switched on
         * `CTRL + <-` and  `CTRL + ->`
         */
        arrowNav: Boolean
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

    watch: {
        arrowNav: {
            immediate: true,
            handler(value, prevValue) {
                if (!this.$isServer && value) {
                    this._toggleArrowNav(true)
                } else if (prevValue) {
                    this._toggleArrowNav(false)
                }
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
        },

        _toggleArrowNav(on = false) {
            if (on) {
                document.addEventListener('keydown', this._globalKeyListener)

                this.$once('hook:beforeDestroy', this._toggleArrowNav)
            } else {
                document.removeEventListener('keydown', this._globalKeyListener)
            }
        },

        _globalKeyListener($event = {}) {
            const key = $event.key

            if (
                !($event.ctrlKey || $event.metaKey) ||
                ['ArrowLeft', 'ArrowRight'].indexOf(key) < 0
            )
                return

            $event.preventDefault()
            $event.stopPropagation()

            if (key === 'ArrowLeft' && this.prevPage !== null) {
                this.$emit('click:page', this.prevPage)
            } else if (key === 'ArrowRight' && this.nextPage !== null) {
                this.$emit('click:page', this.nextPage)
            }
        }
    }
}
</script>
