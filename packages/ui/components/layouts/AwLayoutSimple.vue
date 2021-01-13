<template>
    <div id="layout-simple" class="layout layout--simple">
        <!-- main -->
        <div
            class="layout__content"
            :class="{ 'relative z-0': showMobileMenu }"
        >
            <slot name="before-header" />

            <div class="layout__header">
                <div class="container flex items-center">
                    <!-- mobile menu toggler -->
                    <div class="flex-1 lg:hidden">
                        <button
                            class="w-8 h-8 -ml-1 flex items-center justify-center focus:outline-none"
                            @click="showMobileMenu = !showMobileMenu"
                        >
                            <AwIconSystem name="burger" size="2xl" />
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
                        <!-- navbar menu -->
                        <RouterLink
                            v-if="logo"
                            to="/"
                            class="mr-10 hidden lg:block"
                        >
                            <img :src="logo" class="layout__navbar-logo" />
                        </RouterLink>

                        <ul
                            class="hidden lg:flex list-none layout__navbar-list"
                        >
                            <AwMenuItem
                                v-for="({ key, ...menuItem },
                                i) in sortedMenuItems.visible"
                                :key="key || `item-${i}`"
                                v-bind="menuItem"
                                class="is-thin"
                            />

                            <li
                                v-if="sortedMenuItems.hidden.length"
                                class="aw-menu-item is-thin"
                            >
                                <button
                                    class="aw-menu-item__button"
                                    @click="$refs.drop1.toggle()"
                                >
                                    <AwIconSystem name="more" />
                                </button>

                                <AwDropdown ref="drop1">
                                    <AwDropdownButton
                                        v-for="({ key, ...menuItem },
                                        i) in sortedMenuItems.hidden"
                                        :key="key || `hidden-item-${i}`"
                                        v-bind="menuItem"
                                    />
                                </AwDropdown>
                            </li>
                        </ul>

                        <ul
                            class="hidden lg:flex list-none layout__navbar-list ml-auto mr-4"
                        >
                            <li
                                v-for="{
                                    component,
                                    key,
                                    props: { text, ...props }
                                } in navbarMenu"
                                :key="key"
                                class="relative px-1 text-on-brand cursor-pointer"
                            >
                                <Component :is="component" v-bind="props">
                                    {{
                                        typeof text === 'function'
                                            ? text()
                                            : text
                                    }}
                                </Component>
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

            <!-- content -->
            <slot />

            <!-- copyright -->
            <div class="bg-mono-400 mt-auto text-center text-sm text-mono-400">
                <div
                    v-html="$t('AwLayoutDefault.footer')"
                    class="container py-4"
                />
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
            @close="showMobileMenu = false"
        >
            <AwMenuItem
                v-for="({ key, ...menuItem }, i) in menuItems"
                :key="key || `item-${i}`"
                :style="{ transitionDelay: `${i * 30}ms` }"
                v-bind="menuItem"
            />
        </AwMenu>

        <!-- offline frame -->
        <AwOfflineNotify />
    </div>
</template>

<script>
import { pathOr } from 'rambdax'
import { mapGetters } from 'vuex'
import AwMenu from '../AwMenu.vue'
import AwMenuItem from '../AwMenuItem.vue'
import AwUserMenu from '../AwUserMenu.vue'
import AwOfflineNotify from '../AwOfflineNotify.vue'

const menuSort = (a, b) => a.order > b.order

export default {
    name: 'AwLAyoutSimple',

    components: {
        AwMenu,
        AwMenuItem,
        AwUserMenu,
        AwOfflineNotify
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
        ...mapGetters('awesIo', ['userMenu', 'navbarMenu', 'user']),

        menuItems() {
            return this.menu
                .map(({ props, order, dropdown, children = [] }) => ({
                    ...props,
                    order,
                    dropdown,
                    children: children
                        .map(({ props, order }) => ({ ...props, order }))
                        .sort(menuSort)
                }))
                .sort(menuSort)
        },

        sortedMenuItems() {
            return this.menuItems.reduce(
                (acc, val) => {
                    const key = val.dropdown ? 'hidden' : 'visible'
                    acc[key].push(val)
                    return acc
                },
                {
                    visible: [],
                    hidden: []
                }
            )
        },

        user() {
            return pathOr({}, 'state.auth.user', this.$store)
        },

        logo() {
            return pathOr(null, 'state.logo', this.$store)
        },

        isDarkTheme: {
            get() {
                return this.$store.state.awesIo.isDarkTheme
            },

            set(val) {
                this.$store.commit('awesIo/SET_DARK_THEME', val)
            }
        }
    },

    watch: {
        '$route.path'() {
            this.showMobileMenu = false
        }
    }
}
</script>
