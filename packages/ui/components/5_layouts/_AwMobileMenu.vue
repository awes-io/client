<template>
    <div
        class="aw-mobile-menu"
        :class="{ 'aw-mobile-menu--visible': show }"
        @click="_closeOnLinkClick"
    >
        <div class="aw-mobile-menu__header">
            <button
                v-if="submenuOpened"
                class="inline-flex items-center focus-outline"
                @click="submenuOpened = false"
            >
                <AwIconSystemMono name="angle" size="16" class="mr-2" />
                <span tabindex="-1">{{ $t('AwMobileMenu.back') }}</span>
            </button>
            <!-- close button -->
            <button
                class="aw-mobile-menu__close focus-outline"
                @click="show = false"
            >
                <AwIconSystemMono name="close" size="16" tabindex="-1" />
                <span class="sr-only">
                    {{ $t('AwMobileMenu.close') }}
                </span>
            </button>
        </div>

        <!-- user -->
        <div v-if="user" class="aw-mobile-menu__user">
            <AwAvatar :src="user.src" :name="user.name" size="148" />
            <span class="aw-mobile-menu__user-name">
                <span class="truncate">{{ user.name }}</span>
                <NLink
                    v-if="$config.profileUrl"
                    :to="$config.profileUrl"
                    class="aw-mobile-menu__user-edit focus-outline"
                >
                    <AwIconSystemMono name="edit" size="32" tabindex="-1" />
                    <span class="sr-only">
                        {{ $t('AwMobileMenu.editProfile') }}
                    </span>
                </NLink>
            </span>
            <span class="aw-mobile-menu__user-desc truncate">
                {{ user.description }}
            </span>
        </div>

        <div v-if="submenuOpened" class="aw-mobile-menu__menu">
            <template v-for="({ children, ...item }, i) in submenu">
                <template v-if="children.length">
                    <div :key="'title-' + i">{{ item.text }}</div>
                    <AwMobileMenuItem
                        v-for="(child, j) in children"
                        :key="'child-' + i + j"
                        v-bind="child"
                    />
                </template>
                <AwMobileMenuItem v-else :key="'single-' + i" v-bind="item" />
            </template>
        </div>
        <div v-else class="aw-mobile-menu__menu">
            <AwMobileMenuItem
                v-for="({ children, href, ...item }, i) in menu"
                :key="i"
                v-bind="item"
                :href="children.length ? null : href"
                :arrow="!!children.length"
                v-on="children.length ? { click: () => showSubmenu(i) } : null"
            />
        </div>

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
import { mapGetters } from 'vuex'
import { pathOr, viewOr, lensProp } from 'rambdax'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import AwMobileMenuItem from '@AwLayouts/_AwMobileMenuItem.vue'

export default {
    name: 'AwMobileMenu',

    components: {
        AwMobileMenuItem
    },

    inject: {
        layoutProvider: {
            default: null
        }
    },

    data() {
        return {
            submenuOpened: false,
            submenu: []
        }
    },

    computed: {
        ...mapGetters('awesIo', ['user']),

        menu() {
            const mainMenu = viewOr(
                [],
                lensProp('mainMenu'),
                this.layoutProvider
            )
            const secondaryMenu = viewOr(
                [],
                lensProp('secondaryMenu'),
                this.layoutProvider
            )
            const userMenu = viewOr(
                [],
                lensProp('userMenu'),
                this.layoutProvider
            )

            return mainMenu
                .concat(secondaryMenu)
                .concat(userMenu)
                .filter(({ is }) => !is)
        },

        show: {
            get() {
                return this.$store.state.awesIo.mobileMenuOpened
            },

            set(val) {
                this.$store.commit('awesIo/TOGGLE_MOBILE_MENU', val)
            }
        },

        logo() {
            return pathOr(null, '_config.default.logo', this.$awes)
        }
    },

    watch: {
        show: {
            handler(isVisible) {
                if (isVisible) {
                    // reset view
                    this.submenuOpened = false
                    this.submenu = []

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
        if (typeof this._unwatch === 'function') {
            this._unwatch()
        }
        this.$el && enableBodyScroll(this.$el)
    },

    methods: {
        showSubmenu(index) {
            this.submenu = pathOr([], [index, 'children'], this.menu)
            this.submenuOpened = !!this.submenu.length
        },

        _closeOnLinkClick($event) {
            const link = $event.target.matches('a')
                ? $event.target
                : $event.target.closest('a')

            const { host, href } = window.location

            if (link && link.host === host && link.href !== href) {
                this._unwatch = this.$watch(
                    '$route',
                    () => {
                        this.show = false
                    },
                    { deep: true }
                )
            } else if (link) {
                this.show = false
            }
        }
    }
}
</script>
