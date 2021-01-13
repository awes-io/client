<template>
    <div class="aw-mobile-menu" :class="{ 'aw-mobile-menu--visible': show }">
        <div
            class="aw-mobile-menu__header"
            :class="{ 'bg-surface': submenuOpened }"
        >
            <button
                v-if="submenuOpened"
                class="inline-flex items-center"
                @click="submenuOpened = false"
            >
                <AwIconSystem name="angle" size="16" class="mr-2" />
                back
            </button>
            <!-- close button -->
            <button class="aw-mobile-menu__close" @click="show = false">
                <AwIconSystem name="close" size="16" />
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
import AwMobileMenuItem from './AwMobileMenuItem.vue'

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
        showSubmenu(index) {
            this.submenu = pathOr([], [index, 'children'], this.menu)
            this.submenuOpened = !!this.submenu.length
        }
    }
}
</script>
