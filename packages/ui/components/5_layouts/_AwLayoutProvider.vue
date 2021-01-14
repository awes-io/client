<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isType, defaultTo, pick } from 'rambdax'
import { getPath } from '@AwUtils/router'

const withHref = (child) => child.href

const defaultActive = (child) => child.is_active && child.href

const findHref = (children) => {
    let child = null

    if (children.some(withHref)) {
        child = children.find(defaultActive) || children.find(withHref)
    } else {
        let i = 0
        let max = children.length

        while (!child && i < max) {
            const current = children[i]
            const _children = Array.isArray(current.children)
                ? current.children
                : null
            child =
                (_children && _children.find(defaultActive)) ||
                children.find(withHref)
            i++
        }
    }

    return (child && child.href) || ''
}

export default {
    name: 'AwLayoutProvider',

    provide() {
        return {
            layoutProvider: this.layoutProvider
        }
    },

    data() {
        return {
            layoutProvider: {
                mainMenu: [],
                secondaryMenu: [],
                userMenu: [],
                activeMenuItem: null
            }
        }
    },

    computed: {
        ...mapGetters('awesIo', ['mainMenu', 'secondaryMenu', 'userMenu']),

        _isCurrentPath() {
            const current = getPath(this.$route.path)

            return (item) => {
                return item && item.href
                    ? current.startsWith(getPath(item.href))
                    : false
            }
        }
    },

    watch: {
        mainMenu: {
            handler(items) {
                this.$set(
                    this.layoutProvider,
                    'mainMenu',
                    this._toMenuItems(items)
                )
            },
            immediate: true
        },

        secondaryMenu: {
            handler(items) {
                this.$set(
                    this.layoutProvider,
                    'secondaryMenu',
                    this._toMenuItems(items)
                )
            },
            immediate: true
        },

        userMenu: {
            handler(items) {
                this.$set(
                    this.layoutProvider,
                    'userMenu',
                    this._toMenuItems(items)
                )
            },
            immediate: true
        },

        '$route.path': {
            handler() {
                const item =
                    this._findActive(this.layoutProvider.mainMenu) ||
                    this._findActive(this.layoutProvider.secondaryMenu) ||
                    this._findActive(this.layoutProvider.userMenu) ||
                    null

                this.$set(this.layoutProvider, 'activeMenuItem', item)
            },
            immediate: true
        }
    },

    methods: {
        _toMenuItems(items) {
            if (!items) return []

            const $can = this.$store.state.awesIo.can
            const state = this.$store.state
            const getters = this.$store.getters

            return items.reduce(
                (acc, { show, text, href, children, component, ...props }) => {
                    show = isType('Function', show)
                        ? show($can)
                        : defaultTo(true, show)

                    if (!show) return acc

                    if (component) {
                        return acc.concat(component)
                    }

                    children = Array.isArray(children) ? children : []
                    children = this._toMenuItems(children)
                    href = href || findHref(children)
                    href = isType('Function', href)
                        ? href(state, getters)
                        : href
                    text = this.$t(text)

                    return acc.concat({
                        ...pick('icon,class,expanded,target', props),
                        text,
                        href,
                        children
                    })
                },
                []
            )
        },

        _findActive(items) {
            return items.find(
                (item) =>
                    this._isCurrentPath(item) ||
                    (Array.isArray(item.children)
                        ? item.children.some(
                              (child) =>
                                  this._isCurrentPath(child) ||
                                  (Array.isArray(child.children)
                                      ? child.children.some(this._isCurrentPath)
                                      : null)
                          )
                        : null)
            )
        }
    }
}
</script>
