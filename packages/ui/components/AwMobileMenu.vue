<template>
    <div class="aw-mobile-menu" :class="{ 'aw-mobile-menu--visible': show }">
        <div class="aw-mobile-menu__header" :class="{ 'bg-surface': back }">
            <button
                v-if="back"
                class="inline-flex items-center"
                @click="current = back.key"
            >
                <AwIconSystem name="angle" size="16" class="mr-2" />
                {{ back.text }}
            </button>
            <!-- close button -->
            <button class="aw-mobile-menu__close" @click="$emit('close')">
                <AwIconSystem name="close" size="16" />
                <span class="sr-only">
                    {{ $t('AwMobileMenu.close') }}
                </span>
            </button>
        </div>

        <div
            v-if="user"
            class="aw-mobile-menu__user"
            :class="{ 'aw-mobile-menu__user--hidden': !!current }"
        >
            <AwAvatar :src="user.src" :name="user.name" size="148" />
            <span class="aw-mobile-menu__user-name">
                <span class="truncate">{{ user.name }}</span>
                <NLink
                    v-if="$config.profileUrl"
                    :to="$config.profileUrl"
                    class="aw-mobile-menu__user-edit"
                >
                    <AwIconSystem name="edit" size="32" />
                    <span class="sr-only">
                        {{ $t('AwMobileMenu.editProfile') }}
                    </span>
                </NLink>
            </span>
            <span class="aw-mobile-menu__user-desc truncate">
                {{ user.description }}
            </span>
        </div>

        <!-- levels -->
        <TransitionGroup
            tag="div"
            name="aw-mobile-menu"
            class="aw-mobile-menu__levels"
            :class="{
                'aw-mobile-menu--forward': direction > 0,
                'aw-mobile-menu--back': direction < 0
            }"
            @click.native.capture="handleClick"
        >
            <!-- top level -->
            <div v-show="!current" key="top">
                <AwMobileMenuItem
                    v-for="{ key, props } in _menu"
                    :key="key"
                    v-bind="props"
                />
            </div>

            <!-- lower levels -->
            <div
                v-show="current === key"
                v-for="{ key, items } in levels"
                :key="key"
            >
                <AwMobileMenuItem
                    v-for="{ key, props } in items"
                    :key="key"
                    v-bind="props"
                />
            </div>
        </TransitionGroup>

        <!-- logo -->
        <slot name="logo" v-bind="logo">
            <NLink to="/" class="aw-mobile-menu__logo">
                <img v-if="logo" v-bind="logo" />
                <span class="sr-only">
                    {{ $t('AwMobileMenu.home') }}
                </span>
            </NLink>
            <span class="aw-mobile-menu__version">
                {{ $t('AwMobileMenu.version', { version: $config.VERSION }) }}
            </span>
        </slot>
    </div>
</template>

<script>
import { pick, keys, pathOr } from 'rambdax'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import AwMobileMenuItem from './AwMobileMenuItem.vue'
import { getPath } from '../assets/js/router'

const pickItemProps = pick(keys(AwMobileMenuItem.props))

const PARENT_ATTR = 'data-parent'

const BACK_ATTR = 'data-back'

const MENU_PREFIX = 'm-'

const USER_MENU_PREFIX = 'u-'

const createTopLevel = (keyPrefix) => (item, i) => {
    const props = pickItemProps(item)
    const hasChildren = item.children && item.children.length

    return {
        key: keyPrefix + i,
        props: {
            ...props,
            href: hasChildren ? null : props.href,
            [PARENT_ATTR]: hasChildren ? keyPrefix + i : null
        }
    }
}

const collectChildLevels = (acc = [], _items, parent, keyPrefix) => {
    for (const i in _items) {
        const items = []
        const current = parent ? parent + i : keyPrefix + i
        const children = _items[i].children || []

        if (!children.length) continue

        for (const j in children) {
            const props = pickItemProps(children[j])
            const hasChildren =
                children[j].children && children[j].children.length

            items.push({
                key: current + j,
                props: {
                    ...props,
                    href: hasChildren ? null : props.href,
                    [PARENT_ATTR]: hasChildren ? current + j : null
                }
            })
        }

        acc.push({
            key: current,
            back: {
                key: parent || '',
                text: _items[i].text
            },
            items
        })

        collectChildLevels(acc, children, current, _items[i].text)
    }

    return acc
}

export default {
    name: 'AwMobileMenu',

    components: {
        AwMobileMenuItem
    },

    props: {
        show: Boolean,

        logo: {
            type: Object,
            default: null
        },

        menu: {
            type: Array,
            default: () => []
        },

        user: {
            type: Object,
            default: null
        },

        userMenu: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            current: '',
            direction: 1
        }
    },

    computed: {
        _menu() {
            return this.menu.map(createTopLevel(MENU_PREFIX))
        },

        _userMenu() {
            return this.userMenu.map(createTopLevel(USER_MENU_PREFIX))
        },

        // isDarkTheme: {
        //     get() {
        //         return this.$store.getters['awesIo/isDarkTheme']
        //     },

        //     set(val) {
        //         this.$store.commit('awesIo/SET_DARK_THEME', val)
        //     }
        // },

        levels() {
            const levels = []

            collectChildLevels(levels, this.menu, null, MENU_PREFIX)

            // collectChildLevels(
            //     levels,
            //     this.userMenu,
            //     null,
            //     USER_MENU_PREFIX
            // )

            return levels
        },

        back() {
            return pathOr(
                null,
                'back',
                this.levels.find(({ key }) => key === this.current)
            )
        }
    },

    watch: {
        show: {
            handler(isVisible) {
                const _path = getPath(this.$route)

                if (isVisible) {
                    this.current = pathOr(
                        '',
                        'key',
                        this.levels.find(({ items }) =>
                            items.some(
                                ({ props }) => getPath(props.href) === _path
                            )
                        )
                    )
                    this.$el &&
                        disableBodyScroll(this.$el, {
                            reserveScrollBarGap: true
                        })
                } else {
                    enableBodyScroll(this.$el)
                }
            },
            immediate: true
        }
    },

    beforeDestroy() {
        this.$el && enableBodyScroll(this.$el)
    },

    methods: {
        handleClick($event) {
            const forward = $event.target.hasAttribute(PARENT_ATTR)
                ? $event.target
                : $event.target.closest('[' + PARENT_ATTR + ']')

            if (forward) {
                this.direction = 1
                this.$nextTick(() => {
                    this.current = forward.getAttribute(PARENT_ATTR)
                })
                return
            }

            const back = $event.target.hasAttribute(BACK_ATTR)
                ? $event.target
                : $event.target.closest('[' + BACK_ATTR + ']')

            if (back) {
                this.direction = -1
                this.$nextTick(() => {
                    this.current = back.getAttribute(BACK_ATTR)
                })
                return
            }
        }
    }
}
</script>
