<template>
    <AwSlider
        ref="slider"
        :class="_cssClasses.base"
        @resized="scrollToActive(false)"
    >
        <template
            v-for="({ text, key, route, isActive, isDisabled, ...item }, i) in togglers"
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
                    <span tabindex="-1">
                        {{ text }}
                        <AwBadge v-if="item.badge" v-bind="item.badge" />
                    </span>
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
                    <span tabindex="-1">
                        {{ text }}
                        <AwBadge v-if="item.badge" v-bind="item.badge" />
                    </span>
                </button>
            </slot>
        </template>
    </AwSlider>
</template>

<script>
import {
    pathOr,
    isType,
    pick,
    omit,
    uniq,
    keys,
    equals,
    fromPairs
} from 'rambdax'
import { cleanRouteQuery, trimSlash } from '../../assets/js/router'
import { validateBySchema } from '../../assets/js/component'
import { getBemClasses } from '../../assets/js/css'

export default {
    name: 'AwTabNav',

    _config: {
        baseClass: 'aw-tab-nav'
    },

    props: {
        /**
         * Array of tab objects with `text` property
         * or array of strings which become button names
         *
         * @type {Array<Object|String>}
         */
        items: {
            type: Array,
            required: true,
            validator(items) {
                return items.every(
                    (item) =>
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

        _currentPath() {
            return trimSlash(this.$route.path)
        },

        _allParams() {
            return uniq(
                this.items.reduce((acc, item) => {
                    return acc.concat(keys(pathOr({}, 'href.query', item)))
                }, [])
            )
        },

        _resetParamsQuery() {
            return fromPairs(this._allParams.map((param) => [param, null]))
        },

        togglers() {
            return this.items.map((item, i) => {
                const text = pathOr(item, 'text', item)
                const isDisabled = pathOr(false, 'disabled', item)
                const href = pathOr(false, 'href', item)
                const route = href ? this._normalizeRoute(href) : false
                const isActive = href
                    ? this._isSameRoute(route)
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
            const toggler = this.togglers.find((item) => item.route === route)

            if (toggler && !toggler.isActive) {
                this.$router.push({
                    ...route,
                    query: cleanRouteQuery({
                        ...(this._isSamePath(route) ? this.$route.query : {}),
                        ...route.query
                    })
                })
            }
        },

        update(i) {
            let active = i

            if (Array.isArray(this.active)) {
                if (this.active.includes(i)) {
                    active = this.active.filter((item) => item !== i)
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
        },

        _normalizeRoute(href) {
            const route = this.$router.resolve(href).route

            return {
                ...route,
                query: {
                    ...this._resetParamsQuery,
                    ...cleanRouteQuery(route.query)
                }
            }
        },

        _isSamePath(route) {
            return trimSlash(route.path) === this._currentPath
        },

        _isSameRoute(route) {
            if (!this._isSamePath(route)) {
                return false
            }

            const currentParams = {
                ...this._resetParamsQuery,
                ...pick(this._allParams, this.$route.query)
            }

            return equals(currentParams, route.query)
        }
    }
}
</script>
