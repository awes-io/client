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
                    <AwBadge v-if="item.badge" v-bind="item.badge" />
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
                    <AwBadge v-if="item.badge" v-bind="item.badge" />
                </button>
            </slot>
        </template>
    </AwSlider>
</template>

<script>
import { pathOr, isType, omit } from 'rambdax'
import {
    mergeQueries,
    hasRouteQuery,
    cleanRouteQuery,
    trimSlash
} from '../assets/js/router'
import { validateBySchema } from '../assets/js/component'
import AwSlider from './AwSlider.vue'
import AwBadge from './AwBadge.vue'

export default {
    name: 'AwTabNav',

    components: {
        AwSlider,
        AwBadge
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
         * <AwTabNav :items="[{ text: 'One'}, { text: 'Two'}," />
         */
        items: {
            type: Array,
            required: true,
            validator(items) {
                return items.every(
                    item =>
                        isType('String', item) ||
                        validateBySchema({
                            text: 'string',
                            'href?': 'any',
                            'badge?': 'object'
                        })
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
                    ...omit('text,href', item),
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
