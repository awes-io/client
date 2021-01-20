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
            <AwSwitcher
                v-else
                v-model="isDarkTheme"
                :label="$t('AwMobileMenu.darkTheme')"
            />
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
        <div v-if="user" v-show="!submenuOpened" class="aw-mobile-menu__user">
            <AwAvatar :src="user.src" :name="user.name" size="148" />
            <span class="aw-mobile-menu__user-name truncate">
                {{ user.name }}
            </span>
            <span class="aw-mobile-menu__user-desc truncate">
                {{ user.description }}
            </span>
        </div>

        <!-- top level menu -->
        <AwMobileMenuNav
            v-show="!submenuOpened"
            :title="$t('AwMobileMenu.mainMenu')"
            :items="mainMenu"
            @click:submenu="(submenu) => showSubmenu(submenu)"
        />

        <AwMobileMenuNav
            v-show="!submenuOpened"
            :title="$t('AwMobileMenu.secondaryMenu')"
            :items="secondaryMenu"
            @click:submenu="(submenu) => showSubmenu(submenu)"
        />

        <AwMobileMenuNav
            v-show="!submenuOpened"
            :title="$t('AwMobileMenu.userMenu')"
            :items="userMenu"
            @click:submenu="(submenu) => showSubmenu(submenu)"
        >
            <template #after>
                <li>
                    <AwMobileMenuItem
                        v-if="$auth.loggedIn"
                        :text="$t('AwMobileMenu.logout')"
                        @click="$auth.logout()"
                    />
                </li>
            </template>
        </AwMobileMenuNav>

        <!-- submenu -->
        <AwMobileMenuNav v-show="submenuOpened" :items="submenu" />

        <template v-for="({ text, children }, i) in submenuDeep">
            <AwMobileMenuNav
                :key="i"
                v-show="submenuOpened"
                :title="text"
                :items="children"
            />
        </template>

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

        <button
            class="aw-mobile-menu__overlay"
            aria-hidden="true"
            @click="show = false"
        ></button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { pathOr, viewOr, lensProp, partition } from 'rambdax'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import AwMobileMenuNav from '@AwLayouts/_AwMobileMenuNav.vue'
import AwMobileMenuItem from '@AwLayouts/_AwMobileMenuItem.vue'

export default {
    name: 'AwMobileMenu',

    components: {
        AwMobileMenuNav,
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
            submenu: [],
            submenuDeep: []
        }
    },

    computed: {
        ...mapGetters('awesIo', ['user']),

        mainMenu() {
            return viewOr([], lensProp('mainMenu'), this.layoutProvider).filter(
                ({ is }) => !is
            )
        },

        secondaryMenu() {
            return viewOr(
                [],
                lensProp('secondaryMenu'),
                this.layoutProvider
            ).filter(({ is }) => !is)
        },

        userMenu() {
            return viewOr([], lensProp('userMenu'), this.layoutProvider).filter(
                ({ is }) => !is
            )
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
        },

        isDarkTheme: {
            get() {
                return this.$store.getters['awesIo/isDarkTheme']
            },

            set(val) {
                this.$store.commit('awesIo/SET_DARK_THEME', val)
            }
        }
    },

    watch: {
        show: {
            handler(isVisible) {
                if (isVisible) {
                    // reset view
                    this.submenuOpened = false
                    this.submenu = []
                    this.submenuDeep = []

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
        showSubmenu(items) {
            const [submenu, submenuDeep] = partition(
                ({ children }) =>
                    !Array.isArray(children) || children.length === 0,
                items
            )

            this.submenu = submenu
            this.submenuDeep = submenuDeep

            this.submenuOpened = !!(
                this.submenu.length || this.submenuDeep.length
            )
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
