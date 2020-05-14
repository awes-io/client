<template>
    <div id="layout-simple" class="layout layout--simple">
        <!-- main -->
        <div
            class="layout__content bg-muted"
            :class="{ 'relative z-0': showMobileMenu }"
        >
            <Transition name="collapse">
                <div
                    v-if="notification"
                    class="layout__notification"
                    :class="`bg-${notification.type}`"
                >
                    <span v-html="notification.text"></span>

                    <AwButton
                        class="layout__close"
                        icon="close"
                        theme="ghost"
                        content-class="p-2 text-surface"
                        @click="
                            $store.commit('awesIo/CLOSE_HEADER_NOTIFICATION')
                        "
                    ></AwButton>
                </div>
            </Transition>

            <div class="layout__header">
                <div class="container flex items-center">
                    <!-- mobile menu toggler -->
                    <div class="flex-1 lg:hidden">
                        <button
                            class="w-8 h-8 -ml-1 flex items-center justify-center focus:outline-none"
                            @click="showMobileMenu = !showMobileMenu"
                        >
                            <AwIcon name="burger" size="2xl" />
                            <span class="sr-only">
                                {{ $t('AwLayoutDefault.toggleMenu') }}
                            </span>
                        </button>
                    </div>

                    <div class="flex-1 text-center lg:hidden">
                        <RouterLink
                            to="/"
                            class="truncate"
                            v-html="$t('AwLayoutDefault.caption')"
                        />
                    </div>

                    <div class="w-full flex-1 flex items-center">
                        <RouterLink to="/">
                            <AwUserpic
                                hide-name
                                src="/img/icon.jpg"
                                class="mr-10 hidden lg:block"
                            />
                        </RouterLink>

                        <ul
                            class="hidden lg:flex list-none layout__navbar-list"
                        >
                            <li
                                v-for="({ key, ...menuItem }, i) in menuItems"
                                :key="key || `item-${i}`"
                                class="relative px-3 py-2 text-on-brand cursor-pointer flex items-center"
                            >
                                <div
                                    v-show="!i"
                                    class="bg-on-surface opacity-20 absolute w-full h-full top-0 left-0"
                                    style="z-index: -1"
                                />
                                <AwIcon :name="menuItem.icon" class="mr-3" />
                                {{ menuItem.text }}
                            </li>
                        </ul>

                        <ul
                            class="hidden lg:flex list-none layout__navbar-list ml-auto mr-3"
                        >
                            <li
                                class="relative px-3 py-2 text-on-brand cursor-pointer flex items-center"
                            >
                                <AwIcon name="speaker" size="xl" />
                            </li>

                            <li
                                class="relative px-3 py-2 text-on-brand cursor-pointer flex items-center"
                            >
                                <AwIcon name="location" size="xl" />
                            </li>
                        </ul>

                        <AwUserMenu
                            :avatar="(user.avatar && user.avatar.w96) || ''"
                            :name="user.name"
                            :dark-theme="isDarkTheme"
                            class="ml-auto lg:ml-0"
                            @switch-dark-theme="isDarkTheme = $event"
                        >
                            <Component
                                v-for="{
                                    component,
                                    key,
                                    props: { text, ...props }
                                } in userMenu"
                                :key="key"
                                :is="component"
                                v-bind="props"
                                class="block mt-4"
                            >
                                {{ typeof text === 'function' ? text() : text }}
                            </Component>
                        </AwUserMenu>
                    </div>
                </div>
            </div>

            <div class="bg-surface shadow py-3">
                <div class="flex items-center justify-between container">
                    <h1 class="text-3xl font-bold font-heading">Company</h1>

                    <AwButton size="sm">Create Lead</AwButton>
                </div>
            </div>

            <!-- content -->
            <slot />

            <!-- copyright -->
            <div
                class="bg-muted mt-auto text-center text-sm text-disabled footer__link"
            >
                <div
                    v-html="$t('AwLayoutDefault.footer')"
                    class="container py-4"
                ></div>
            </div>
        </div>

        <!-- mobile navigation overlay -->
        <Transition name="fade">
            <button
                v-show="showMobileMenu"
                class="block w-full fixed inset-0 bg-overlay opacity-50 lg:hidden"
                @click="showMobileMenu = false"
            >
                <span class="sr-only">
                    {{ $t('AwLayoutDefault.toggleMenu') }}
                </span>
            </button>
        </Transition>

        <!-- navigation -->
        <AwMenu
            :class="{ 'is-visible': showMobileMenu }"
            class="lg:hidden"
            @toggle-width="toggleWidth"
            @close="showMobileMenu = false"
        >
            <AwMenuItem
                v-for="({ key, ...menuItem }, i) in menuItems"
                :key="key || `item-${i}`"
                :style="{ transitionDelay: `${i * 30}ms` }"
                v-bind="menuItem"
            />
        </AwMenu>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { pathOr } from 'rambdax'
import AwIcon from './AwIcon.vue'
import AwMenu from './AwMenu.vue'
import AwMenuItem from './AwMenuItem.vue'

const LS_MENU_THIN_KEY = 'AW_MENU_THIN'
const menuSort = (a, b) => a.order > b.order

export default {
    name: 'AwLAyoutSimple',

    components: {
        AwIcon,
        AwMenu,
        AwMenuItem
    },

    props: {
        menu: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            showMobileMenu: false
        }
    },

    computed: {
        ...mapGetters('awesIo', [
            'mainMenu',
            'userMenu',
            'navbarMenu',
            'isHeaderNotificationShown'
        ]),

        isDarkTheme: {
            get() {
                return this.$store.state.awesIo.isDarkTheme
            },

            set(val) {
                this.$store.commit('awesIo/SET_DARK_THEME', val)
            }
        },

        user() {
            return pathOr({}, 'state.auth.user', this.$store)
        },

        notification() {
            return (
                this.isHeaderNotificationShown &&
                pathOr(
                    null,
                    ['state', 'auth', 'user', 'notification'],
                    this.$store
                )
            )
        },

        menuItems() {
            return this.menu
                .map(({ props, order, children = [] }) => ({
                    ...props,
                    order,
                    children: children
                        .map(({ props, order }) => ({ ...props, order }))
                        .sort(menuSort)
                }))
                .sort(menuSort)
        }
    },

    watch: {
        '$route.path'() {
            this.showMobileMenu = false
        }
    },

    mounted() {
        try {
            const menuThin = localStorage.getItem(LS_MENU_THIN_KEY)
            this.menuThin = menuThin === 'true'
        } catch (e) {
            console.log(e)
        }
    },

    methods: {
        toggleWidth() {
            this.menuThin = !this.menuThin

            try {
                if (this.menuThin) {
                    localStorage.setItem(LS_MENU_THIN_KEY, this.menuThin)
                } else {
                    localStorage.removeItem(LS_MENU_THIN_KEY)
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>
