<template>
    <div :class="css.wrap">
        <template
            v-for="({ text, key, route, isActive, classes, ...item },
            i) in togglers"
        >
            <span
                v-if="i > 0 && css.divider"
                :class="css.divider"
                aria-hidden="true"
                :key="`divider-${i}`"
            ></span>
            <slot v-bind="{ text, key, route, isActive, ...item, css }">
                <a
                    v-if="route"
                    :key="key"
                    :href="route.fullPath"
                    :class="classes"
                    @click.prevent="navigate(route)"
                >
                    {{ text }}
                </a>
                <button
                    v-else
                    :key="key"
                    :class="classes"
                    @click="$emit('update:active', i)"
                >
                    {{ text }}
                </button>
            </slot>
        </template>
    </div>
</template>

<script>
import { pathOr } from 'rambdax'
import { mergeQueries, hasRouteQuery, cleanRouteQuery, trimSlash } from '../assets/js/router'

export default {
    name: 'AwTabNav',

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

    css: {
        wrap: 'flex items-center border-b',
        toggler:
            'py-5 px-1 -mb-px text-sm leading-none border-b-2 transition-all focus:outline-none',
        togglerActive: 'opacity-100 border-brand',
        togglerInactive:
            'opacity-60 hover:opacity-100 focus:opacity-100 border-transparent',
        divider: 'block w-px mx-3 h-6 border-l'
    },

    computed: {
        css() {
            return pathOr({}, 'css', this.$options)
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
            return href => {
                if (typeof href === 'object') {
                    // check for query existance in current route
                    return hasRouteQuery(pathOr({}, 'query', href), this.$route)
                } else {
                    // compare path without params for `String` routes
                    return href === this.$route.path
                }
            }
        },

        togglers() {
            return this.items.map((item, i) => {
                const text = pathOr(item, 'text', item)
                const href = pathOr(false, 'href', item)
                const isActive = href
                    ? this._routeMatcher(href)
                    : i === this.active

                return {
                    ...item,
                    route: href ? this._routeNormalizer(href) : false,
                    isActive,
                    text,
                    key: `${text}-${i}`,
                    classes: [
                        this.css.toggler,
                        isActive
                            ? this.css.togglerActive
                            : this.css.togglerInactive
                    ]
                }
            })
        }
    },

    methods: {
        navigate(route) {
            try {
                this.$router.push(route)
            } catch (e) {
                // current route
            }
        }
    }
}
</script>
