<template>
    <AwSlider
        ref="slider"
        :class="_cssClasses.base"
        @resized="scrollToActive(false)"
    >
        <template
            v-for="({ text, key, route, isActive, isDisabled, ...item },
            i) in togglers"
        >
            <slot v-bind="{ text, key, route, isActive, ...item }">
                <a
                    v-if="route"
                    :key="key"
                    :href="isDisabled ? null : route.fullPath"
                    :class="[
                        _cssClasses.toggler,
                        { [_cssClasses.togglerActive]: isActive },
                        { [_cssClasses.togglerDisabled]: isDisabled }
                    ]"
                    @click.prevent="navigate(route)"
                >
                    {{ text }}
                    <AwBadge v-if="item.badge" v-bind="item.badge" />
                </a>
                <button
                    v-else
                    :key="key"
                    :class="[
                        _cssClasses.toggler,
                        { [_cssClasses.togglerActive]: isActive },
                        { [_cssClasses.togglerDisabled]: isDisabled }
                    ]"
                    :disabled="isDisabled ? '' : null"
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
import { pathOr, isType, omit, uniq, keys, fromPairs } from 'rambdax'
import {
    mergeQueries,
    hasRouteQuery,
    cleanRouteQuery,
    trimSlash
} from '../assets/js/router'
import { validateBySchema } from '../assets/js/component'
import { getBemClasses } from '../assets/js/css'
import AwSlider from './AwSlider.vue'
import AwBadge from './AwBadge.vue'

export default {
    name: 'AwTabNav',

    components: {
        AwSlider,
        AwBadge
    },

    _config: {
        baseClass: 'aw-tab-nav'
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
         * @type {Number|Array}
         */
        active: {
            type: [Number, Array],
            default: 0,
            validator(val) {
                return Array.isArray(val) ? !val.every(isNaN) : !isNaN(val)
            }
        }
    },

    computed: {
        _cssClasses() {
            const base = this.$options._config.baseClass
            return {
                base,
                ...getBemClasses(base, [
                    'toggler',
                    'toggler_active',
                    'toggler_disabled'
                ])
            }
        },

        _resetParams() {
            return uniq(
                this.items.reduce((acc, item) => {
                    return acc.concat(keys(pathOr({}, 'href.query', item)))
                }, [])
            )
        },

        _resetParamsQuery() {
            return fromPairs(this._resetParams.map(param => [param, null]))
        },

        _routeNormalizer() {
            return href => {
                if (typeof href === 'object') {
                    const currentPath = trimSlash(this.$route.path)
                    const path = trimSlash(pathOr(currentPath, 'path', href))

                    if (path === currentPath) {
                        return this.$router.resolve({
                            path,
                            query: mergeQueries(
                                {
                                    ...this._resetParamsQuery,
                                    ...pathOr({}, 'query', href)
                                },
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
                const isDisabled = pathOr(false, 'disabled', item)
                const href = pathOr(false, 'href', item)
                const route = href ? this._routeNormalizer(href) : false
                const isActive = href
                    ? this._routeMatcher(route)
                    : Array.isArray(this.active)
                    ? this.active.includes(i)
                    : i === this.active

                return {
                    ...omit('text,href', item),
                    route,
                    isActive,
                    isDisabled,
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
            let active = i

            if (Array.isArray(this.active)) {
                if (this.active.includes(i)) {
                    active = this.active.filter(item => item !== i)
                } else {
                    active = this.active.concat(i)
                }
            }

            this.$emit('update:active', active)
        },

        scrollToActive(force = true) {
            const el = this.$el.querySelectorAll(
                '.' + this._cssClasses.togglerActive
            )
            if (el.length === 1 || (el.length > 1 && force)) {
                this.$refs.slider.scrollTo(el[0])
            }
        }
    }
}
</script>
