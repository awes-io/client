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

// const flattenChildren = (menu, items) => {
//     for (let i = menu.length - 1; i >= 0; i--) {
//         const item = menu[i]

//         if (item.children && item.children.length) {
//             for (let j = item.children.length - 1; j >= 0; j--) {
//                 const item2 = item.children[j]

//                 if (item2.children && item2.children.length) {
//                     for (let k = item2.children.length - 1; k >= 0; k--) {
//                         items.push({
//                             item: item2.children[k],
//                             parent: item2,
//                             top: menu
//                         })
//                     }
//                 } else {
//                     items.push({ item: item2, parent: item, top: menu })
//                 }
//             }
//         } else {
//             items.push({ item, parent: menu, top: menu })
//         }
//     }
// }

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
                activeMenu: null,
                activeMenuItem: null
            }
        }
    },

    computed: {
        ...mapGetters('awesIo', ['mainMenu', 'secondaryMenu', 'userMenu']),

        // _flatChildren() {
        //     const items = []

        //     flattenChildren(this.mainMenu, items)
        //     flattenChildren(this.secondaryMenu, items)
        //     flattenChildren(this.userMenu, items)

        //     return items
        // },

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
                    this._findActiveItem(this.layoutProvider.mainMenu) ||
                    this._findActiveItem(this.layoutProvider.secondaryMenu) ||
                    this._findActiveItem(this.layoutProvider.userMenu) ||
                    null

                const menu =
                    this._findActiveMenu(this.layoutProvider.mainMenu) ||
                    this._findActiveMenu(this.layoutProvider.secondaryMenu) ||
                    this._findActiveMenu(this.layoutProvider.userMenu) ||
                    null

                this.$set(this.layoutProvider, 'activeMenuItem', item)
                this.$set(this.layoutProvider, 'activeMenu', menu)
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

        _findActiveItem(items) {
            let item = null
            let i = 0
            const max = items.length

            while (!item && i < max) {
                if (items[i].children && items[i].children.length) {
                    item = this._findActiveItem(items[i].children)
                } else if (this._isCurrentPath(items[i])) {
                    item = items[i]
                }
                i++
            }

            return item
        },

        _findActiveMenu(items) {
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
