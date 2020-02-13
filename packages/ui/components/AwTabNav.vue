<template>
    <AwSlider class="aw-tab-nav">
        <template
            v-for="({ text, key, route, isActive, ...item }, i) in togglers"
        >
            <slot v-bind="{ text, key, route, isActive, ...item }">
                <a
                    v-if="route"
                    :key="key"
                    :href="route.fullPath"
                    :class="{ 'aw-tab-nav__toggler_active': isActive }"
                    class="aw-tab-nav__toggler"
                    @click.prevent="navigate(route)"
                >
                    {{ text }}
                </a>
                <button
                    v-else
                    :key="key"
                    :class="{ 'aw-tab-nav__toggler_active': isActive }"
                    class="aw-tab-nav__toggler"
                    type="button"
                    @click.prevent="update(i)"
                >
                    {{ text }}
                </button>
            </slot>
        </template>
    </AwSlider>
</template>

<script>
import { pathOr } from 'rambdax'
import {
    mergeQueries,
    hasRouteQuery,
    cleanRouteQuery,
    trimSlash
} from '../assets/js/router'
import AwSlider from './AwSlider.vue'

export default {
    name: 'AwTabNav',

    components: {
        AwSlider
    },

    props: {
        /**
         * Array of tab objects with `text` property
         * or array of strings which become button names
         *
         * @type {Array<Object|String>}
         *
         * @example
         * <AwTabNav :items="[{ text: 'One', href: '/one' }, { text: 'Two', href: '/two' }]" />
         * <AwTabNav :items="['One', 'Two']" />
         */
        items: {
            type: Array,
            required: true,
            validator(items) {
                return (
                    items.every(item => typeof item === 'string') ||
                    items.every(item => item && item.text && item.href)
                )
            }
        },

        /**
         * Active tab index (for button tabs)
         *
         * @type {Number}
         */
        active: {
            type: Number,
            default: 0
        }
    },

    computed: {
        _routeNormalizer() {
            return href => {
                if (typeof href === 'object') {
                    const currentPath = trimSlash(this.$route.path)
                    const path = trimSlash(pathOr(currentPath, 'path', href))

                    if (path === currentPath) {
                        return this.$router.resolve({
                            path,
                            query: mergeQueries(
                                pathOr({}, 'query', href),
                                this.$route.query
                            ),
                            hash: this.$route.hash
                        }).route
                    } else {
                        return this.$router.resolve({
                            ...href,
                            query: cleanRouteQuery(pathOr({}, 'query', href))
                        }).route
                    }
                } else {
                    return this.$router.resolve(href).route
                }
            }
        },

        _routeMatcher() {
            return route => {
                // check if same path
                const isSamePath =
                    trimSlash(route.path) === trimSlash(this.$route.path)

                return (
                    isSamePath &&
                    // check for query existance in current route
                    hasRouteQuery(route.query, this.$route)
                )
            }
        },

        togglers() {
            return this.items.map((item, i) => {
                const text = pathOr(item, 'text', item)
                const href = pathOr(false, 'href', item)
                const route = href ? this._routeNormalizer(href) : false
                const isActive = href
                    ? this._routeMatcher(route)
                    : i === this.active

                return {
                    ...item,
                    route,
                    isActive,
                    text,
                    key: `${text}-${i}`
                }
            })
        }
    },

    mounted() {
        this.$nextTick(this.scrollToActive)
    },

    methods: {
        navigate(route) {
            const toggler = this.togglers.find(item => item.route === route)

            if (toggler && !toggler.isActive) {
                this.$router.push(route)
            }
        },

        update(i) {
            this.$emit('update:active', i)
        },

        scrollToActive() {
            const el = this.$el.querySelector('.aw-tab-nav__toggler_active')
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'end'
                    })
                }, 10)
            }
        }
    }
}
</script>
