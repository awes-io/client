<template>
    <div class="relative overflow-hidden" v-pan="onPan">
        <div class="overflow-visible bg-muted-dark rounded-lg surface">
            <div
                class="flex"
                :style="
                    `transform: translateX(calc(var(--x, ${currentOffset}) * 1%));`
                "
                ref="list"
            >
                <template v-for="({ text, href }, i) in mergedItems">
                    <RouterLink
                        v-if="href"
                        :key="`${text}-${i}`"
                        class="whitespace-no-wrap rounded-sm focus:outline-none px-2 py-1 m-1 sm:px-4 sm:py-2 text-sm leading-loose sm:leading-normal"
                        :class="
                            i === active
                                ? 'bg-surface shadow opacity-100 js-active'
                                : 'hover:bg-muted focus:shadow-outline'
                        "
                        :to="href"
                        exact
                        v-tap="e => onTap(e, text)"
                    >
                        {{ text }}
                    </RouterLink>
                    <span
                        v-else
                        :key="`spacer-${i}`"
                        class="whitespace-no-wrap text-sm opacity-50 px-2 py-1 m-1 sm:px-4 sm:py-2 cursor-not-allowed leading-loose sm:leading-normal"
                    >
                        {{ text }}
                    </span>
                    <div
                        v-if="i < mergedItems.length - 1"
                        class="border h-5 bg-muted mt-3"
                        :key="`line-${i}`"
                    ></div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Hammer from 'hammerjs'
import { hasRouteQuery, mergeRouteQuery } from '../assets/js/router'

Vue.directive('pan', {
    bind: function(el, binding) {
        if (typeof binding.value === 'function') {
            const mc = new Hammer(el)
            mc.get('pan').set({ direction: Hammer.DIRECTION_ALL })
            mc.on('pan', binding.value)
        }
    }
})

Vue.directive('tap', {
    bind: function(el, binding) {
        if (typeof binding.value === 'function') {
            const mc = new Hammer(el)
            mc.on('tap', binding.value)
        }
    }
})

export default {
    name: 'AwButtonNav',

    model: {
        prop: 'active',
        event: 'activated'
    },

    data() {
        return {
            currentOffset: 0
        }
    },

    props: {
        items: {
            type: Array,
            default: () => []
        }
    },

    methods: {
        onPan(e) {
            const dragOffset =
                (((100 / this.itemWidth) * e.deltaX) / this.count) *
                this.overflowRatio

            const transform = this.currentOffset + dragOffset

            this.$refs.list.style.setProperty('--x', transform)

            if (e.isFinal) {
                this.currentOffset = transform
                const maxScroll = 100 - this.overflowRatio * 100
                let finalOffset = this.currentOffset

                // scrolled to last item
                if (this.currentOffset <= maxScroll) {
                    finalOffset = maxScroll
                } else if (this.currentOffset >= 0) {
                    // scroll to first item
                    finalOffset = 0
                } else {
                    // animate to next item according to pan direction
                    const index =
                        (this.currentOffset / this.overflowRatio / 100) *
                        this.count
                    const nextIndex =
                        e.deltaX <= 0 ? Math.floor(index) : Math.ceil(index)
                    finalOffset =
                        ((100 * this.overflowRatio) / this.count) * nextIndex
                }

                // bounce back animation
                window.TweenMax.fromTo(
                    this.$refs.list,
                    0.4,
                    { '--x': this.currentOffset },
                    {
                        '--x': finalOffset,
                        ease: window.Elastic.easeOut.config(1, 0.8),
                        onComplete: () => {
                            this.currentOffset = finalOffset
                        }
                    }
                )
            }
        },
        onTap(e, value) {
            if (value) {
                window.TweenMax.to(e.target, 0.12, {
                    scale: 1.1,
                    yoyo: true,
                    repeat: 1,
                    ease: window.Sine.easeOut
                })
            }
        }
    },

    computed: {
        overflowRatio() {
            return this.$refs.list.scrollWidth / this.$refs.list.offsetWidth
        },
        itemWidth() {
            return this.$refs.list.scrollWidth / this.mergedItems.length
        },
        count() {
            return this.mergedItems.length
        },

        mergedItems() {
            return this.items.map(({ text, href }) => ({
                text,
                href:
                    typeof href === 'object'
                        ? mergeRouteQuery(href.query, this.$route)
                        : href
            }))
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
    }
}
</script>
