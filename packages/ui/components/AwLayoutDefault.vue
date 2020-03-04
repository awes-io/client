<template>
    <div id="layout-default" class="layout layout--default">
        <!-- main -->
        <div
            class="layout__content"
            :class="{ 'is-wide': menuThin, 'relative z-0': showMobileMenu }"
        >
            <transition name="collapse">
                <div
                    v-if="notification"
                    class="layout__notification"
                    :class="`bg-${notification.type}`"
                >
                    {{ notification.text }}

                    <button class="layout__close p-2" @click="onCloseClick">
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 19 19"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path stroke-width="1.1" d="M1 17L17 1M1 1l16 16" />
                        </svg>
                    </button>
                </div>
            </transition>

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

                    <div class="w-full flex-1 flex items-center justify-end">
                        <!-- navbar-->
                        <slot name="navbar" />
                    </div>
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
            :class="{ 'is-visible': showMobileMenu, 'is-thin': menuThin }"
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
import { pathOr } from 'rambdax'
import { mapGetters } from 'vuex'
import { trimSlash } from '../assets/js/router'
import AwIcon from './AwIcon.vue'
import AwMenu from './AwMenu.vue'
import AwMenuItem from './AwMenuItem.vue'

const LS_MENU_THIN_KEY = 'AW_MENU_THIN'
const menuSort = (a, b) => a.order > b.order

export default {
    name: 'AwLayoutDefault',

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
            menuThin: false,
            showMobileMenu: false
        }
    },

    computed: {
        ...mapGetters('awesIo', ['isHeaderNotificationShown']),
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
        }
    },

    watch: {
        '$route.path': function(newPath, oldPath) {
            if (trimSlash(oldPath) !== trimSlash(newPath)) {
                this.showMobileMenu = false
            }
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
        },

        onCloseClick() {
            this.$store.commit('awesIo/CLOSE_HEADER_NOTIFICATION')
        }
    }
}
</script>
