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
                    <AwMenuItemIcon
                        v-else
                        :key="i"
                        v-bind="_getMenuItemProps(item)"
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
                    <AwMenuItemIcon
                        v-else
                        :key="i"
                        v-bind="_getMenuItemProps(item)"
                        :active="item === activeMenuItem"
                        tooltip
                    />
                </template>
            </slot>
        </div>

        <!-- user menu -->
        <AwUserMenu class="aw-layout-menu__aw-user-menu" />

        <!-- submenu -->
        <div
            class="aw-layout-menu__submenu"
            :class="{ 'aw-layout-menu__submenu--hidden': !hasSubmenu }"
        >
            <slot v-if="!hideAside" name="submenu">
                <AwNav :title="submenuTitle" :items="submenu" />
            </slot>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { pathOr, viewOr, lensProp, omit } from 'rambdax'
import AwMenuItemIcon from '@AwLayouts/_AwMenuItemIcon.vue'
import AwUserMenu from '@AwLayouts/_AwUserMenu.vue'
import AwNav from '@AwLayouts/_AwNav.vue'

export default {
    name: 'AwLayoutMenu',

    components: {
        AwMenuItemIcon,
        AwUserMenu,
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

        logo() {
            return pathOr(null, '_config.default.logo', this.$awes)
        }
    },

    methods: {
        _getMenuItemProps(props) {
            return omit('children', props)
        }
    }
}
</script>
