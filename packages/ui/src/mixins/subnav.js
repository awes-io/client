import { hasRouteQuery, mergeRouteQuery } from '~/assets/js/router'

export default {
    model: {
        prop: 'active',
        event: 'activated'
    },

    props: {
        items: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            marker: {
                left: 0,
                width: 0
            }
        }
    },

    computed: {
        mergedItems() {
            return this.items.map(({ text, href }) => ({
                text,
                href:
                    typeof href === 'object'
                        ? mergeRouteQuery(href.query, this.$route)
                        : href
            }))
        },

        markerStyle() {
            return {
                left: `${this.marker.left}px`,
                width: `${this.marker.width}px`
            }
        },

        active() {
            return this.items.findIndex(item => {
                const href = item.href

                if (!href) {
                    return false
                }

                if (typeof href === 'string') {
                    return href === this.$route.path
                } else {
                    const { path, hash, query } = href
                    const sameQuery = query
                        ? hasRouteQuery(query, this.$route)
                        : true
                    const samePath = path ? path === this.$route.path : true
                    const sameHash = hash ? hash === this.$route.hash : true
                    return sameQuery && samePath && sameHash
                }
            })
        }
    },

    watch: {
        active: {
            handler() {
                this.$nextTick(this.moveMarker)
            },
            immediate: true
        },

        '$route.query': function() {
            this.$nextTick(this.moveMarker)
        }
    },

    methods: {
        moveMarker() {
            let activeItem = this.$el.querySelector('.js-active')
            let width = 0
            let left = 0

            if (activeItem) {
                // get real element if component given
                activeItem = activeItem.$el || activeItem

                // get dimensions
                width = activeItem.clientWidth
                left = activeItem.offsetLeft
            }

            this.marker = { left, width }
        }
    }
}
