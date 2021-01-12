<template>
    <div
        class="aw-layout-menu"
        :class="{
            'aw-layout-menu--no-submenu': hideAside || !hasSubmenu
        }"
    >
        <slot name="logo" v-bind="logo">
            <NLink to="/" class="aw-layout-menu__logo">
                <img v-if="logo" v-bind="logo" />
            </NLink>
        </slot>

        <div class="aw-layout-menu__menu">
            <slot name="menu">
                <template v-for="(item, i) in mainMenu">
                    <!-- eslint-disable-next-line vue/require-component-is -->
                    <Component v-if="item.is" :key="'cmp-' + i" v-bind="item" />
                    <AwIconMenuItem
                        v-else
                        :key="i"
                        v-bind="item"
                        :active="item === activeMenuItem"
                        tooltip
                    />
                </template>
            </slot>
        </div>

        <div class="aw-layout-menu__secondary-menu">
            <slot name="secondary-menu">
                <template v-for="(item, i) in secondaryMenu">
                    <!-- eslint-disable-next-line vue/require-component-is -->
                    <Component v-if="item.is" :key="'cmp-' + i" v-bind="item" />
                    <AwIconMenuItem
                        v-else
                        :key="i"
                        v-bind="item"
                        :active="item === activeMenuItem"
                        tooltip
                    />
                </template>
            </slot>
        </div>

        <slot name="user">
            <span
                v-if="user || hasUserMenu"
                ref="userAvatar"
                class="aw-layout-menu__user"
                :tabindex="hasUserMenu ? 0 : null"
                :role="hasUserMenu ? 'menuitem' : null"
                :aria-haspopup="hasUserMenu ? 'true' : null"
            >
                <AwAvatar v-bind="user" />
            </span>
        </slot>

        <slot name="user-menu" :userMenu="userMenu">
            <div ref="userMenu" class="aw-layout-menu__user-menu">
                <template v-for="(item, i) in userMenu">
                    <!-- eslint-disable-next-line vue/require-component-is -->
                    <Component v-if="item.is" :key="'cmp-' + i" v-bind="item" />
                    <AwMobileMenuItem
                        v-else
                        :key="i"
                        v-bind="item"
                        :active="item === activeMenuItem"
                    />
                </template>
            </div>
        </slot>

        <!-- submenu -->
        <div
            class="aw-layout-menu__submenu"
            :class="{ 'aw-layout-menu__submenu--hidden': !hasSubmenu }"
        >
            <slot v-if="!hideAside" name="submenu">
                <AwNav
                    class="aw-layout-menu__aw-menu"
                    :class="{ 'aw-layout-menu__aw-menu--hidden': !hasSubmenu }"
                    :title="submenuTitle"
                    :items="submenu"
                />
            </slot>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { pathOr, viewOr, lensProp } from 'rambdax'
import AwIconMenuItem from './AwIconMenuItem.vue'
import AwMobileMenuItem from './AwMobileMenuItem.vue'
import AwNav from './AwNav.vue'

export default {
    name: 'AwLayoutMenu',

    components: {
        AwIconMenuItem,
        AwMobileMenuItem,
        AwNav
    },

    props: {
        hideAside: Boolean
    },

    inject: {
        layoutProvider: {
            default: null
        }
    },

    computed: {
        ...mapGetters('awesIo', ['user']),

        mainMenu() {
            return viewOr([], lensProp('mainMenu'), this.layoutProvider)
        },

        secondaryMenu() {
            return viewOr([], lensProp('secondaryMenu'), this.layoutProvider)
        },

        userMenu() {
            return viewOr([], lensProp('userMenu'), this.layoutProvider)
        },

        activeMenuItem() {
            return viewOr(null, lensProp('activeMenuItem'), this.layoutProvider)
        },

        submenu() {
            return viewOr([], lensProp('children'), this.activeMenuItem)
        },

        hasSubmenu() {
            return this.submenu.length
        },

        submenuTitle() {
            return this.hasSubmenu
                ? pathOr('', 'text', this.activeMenuItem)
                : ''
        },

        hasUserMenu() {
            return this.userMenu.length
        },

        logo() {
            return pathOr(null, '_config.default.logo', this.$awes)
        }
    },

    watch: {
        '$route.path': {
            handler() {
                const activeElement = document.activeElement

                if (
                    activeElement &&
                    (this.$refs.userAvatar === activeElement ||
                        this.$refs.userMenu.contains(activeElement))
                ) {
                    activeElement.blur()
                }
            }
        }
    }
}
</script>
