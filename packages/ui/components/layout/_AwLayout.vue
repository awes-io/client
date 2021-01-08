<template>
    <div id="layout-default" class="layout layout--default">
        <!-- main -->
        <div
            class="layout__content"
            :class="{ 'is-wide': menuThin, 'relative z-0': showMobileMenu }"
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

                    <div class="w-full flex-1 flex items-center justify-end">
                        <!-- navbar-->
                        <slot name="navbar" />
                    </div>
                </div>
            </div>

            <!-- content -->
            <slot />

            <!-- copyright -->
            <div class="bg-mono-900 mt-auto text-center text-sm text-mono-400">
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
                v-for="({ key, ...menuItem }, i) in menu"
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
import { trimSlash } from '../../assets/js/router'
import AwMenu from '../AwMenu.vue'
import AwMenuItem from '../AwMenuItem.vue'
import AwOfflineNotify from '../AwOfflineNotify.vue'

const LS_MENU_THIN_KEY = 'AW_MENU_THIN'

export default {
    name: 'AwLayout',

    components: {
        AwMenu,
        AwMenuItem,
        AwOfflineNotify
    },

    data() {
        return {
            menuThin: false,
            showMobileMenu: false
        }
    },

    computed: {
        menu() {
            return this.$store.getters['awesIo/menu']
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
        }
    }
}
</script>
