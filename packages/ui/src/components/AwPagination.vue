<template>
    <div
        v-if="pages.length > 1"
        class="flex flex-wrap items-center justify-center"
    >
        <!-- info text -->
        <span class="pr-4 lg:pr-0 lg:flex-1 text-sm opacity-50">{{
            $t('AwPagination.info', {
                from: currentPage.from,
                to: currentPage.to,
                total
            })
        }}</span>

        <!-- pagination -->
        <div
            class="order-first md:order-none w-full md:w-auto mb-2 md:mb-0 flex-grow flex justify-center"
        >
            <AwButtonNav :items="pageButtons" />
        </div>

        <!-- limit -->
        <div class="pl-4 lg:pl-0 lg:flex-1 flex justify-end">
            <button
                class="opacity-50 text-sm hover:opacity-100 focus:opacity-100"
                @click="$refs.dropdown.toggle()"
            >
                {{ limit }} <AwIcon name="triangle-d" />
            </button>
            <AwDropdown
                ref="dropdown"
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
                        v-for="{ key, ...button } in limitButtons"
                        :key="key"
                        theme="toggle"
                        class="w-full text-left"
                        v-bind="button"
                    />
                </AwGrid>
            </AwDropdown>
        </div>
    </div>
</template>

<script>
import { mergeRouteQuery } from '~/assets/js/router'

export default {
    name: 'AwPagination',

    props: {
        total: {
            type: Number,
            required: true
        },

        limits: {
            type: Array,
            default: () => [15, 50, 100]
        },

        pageParam: {
            type: String,
            default: 'page'
        },

        limitParam: {
            type: String,
            default: 'limit'
        }
    },

    computed: {
        limitButtons() {
            return this.limits.map(this._getLimitButtonProps)
        },

        limit() {
            return Number(this.$route.query[this.limitParam] || this.limits[0])
        },

        pageButtons() {
            return this.pagesFiltered.map(this._getButtonProps)
        },

        page() {
            return Number(this.$route.query[this.pageParam] || 1)
        },

        pages() {
            const pages = []
            const limit = this.limit
            const total = this.total
            let index = 1

            do {
                const fromItem = (index - 1) * limit + 1
                const toItem = index * limit < total ? index * limit : total

                pages.push({
                    index,
                    from: fromItem,
                    to: toItem
                })
                index += 1
            } while ((index - 1) * limit < total)

            return pages
        },

        pagesFiltered() {
            if (this.pages.length < 8) {
                return this.pages
            } else {
                const currentIndex = this.page
                const lastIndex = this.lastPage.index
                let middle

                if (currentIndex < 5) {
                    middle = [...this.pages.slice(1, 5), null]
                } else if (lastIndex - currentIndex < 4) {
                    middle = [
                        null,
                        ...this.pages.slice(lastIndex - 5, lastIndex - 1)
                    ]
                } else {
                    middle = [
                        null,
                        ...this.pages.slice(currentIndex - 2, currentIndex + 1),
                        null
                    ]
                }

                return [this.firstPage, ...middle, this.lastPage]
            }
        },

        firstPage() {
            return this.pages[0]
        },

        currentPage() {
            return this.pages.find(({ index }) => index === this.page)
        },

        lastPage() {
            return this.pages[this.pages.length - 1]
        }
    },

    methods: {
        _getButtonProps(page) {
            if (page) {
                const pageStr = String(page.index)
                return {
                    text: pageStr,
                    href: {
                        query: {
                            [this.pageParam]: page.index > 1 ? pageStr : null
                        }
                    }
                }
            } else {
                return { text: '...' }
            }
        },

        _getLimitButtonProps(limit, i) {
            const limitStr = String(limit)

            return {
                href: mergeRouteQuery(
                    {
                        [this.pageParam]: null,
                        [this.limitParam]: i > 0 ? limitStr : null
                    },
                    this.$route
                ),
                key: `${limitStr}-${i}`,
                text: limitStr,
                active: limit === this.limit
            }
        }
    }
}
</script>
