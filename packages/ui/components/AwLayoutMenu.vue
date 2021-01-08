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
            <slot name="menu" :menu="menu">
                <AwIconMenuItem
                    v-for="(item, i) in menu"
                    :key="item.key"
                    :active="i === activeIndex"
                    v-bind="_getIconProps(item)"
                    tooltip
                />
            </slot>
        </div>

        <div class="aw-layout-menu__service-menu">
            <slot name="service-menu" :serviceMenu="serviceMenu">
                <AwIconMenuItem
                    v-for="{ key, ...props } in serviceMenu"
                    :key="key"
                    v-bind="props"
                />
            </slot>
        </div>

        <slot name="user" v-bind="{ user, userMenu }">
            <span
                v-if="user || hasUserMenu"
                id="user-menu"
                class="aw-layout-menu__user"
                :tabindex="hasUserMenu ? 0 : null"
                :role="hasUserMenu ? 'menuitem' : null"
                :aria-haspopup="hasUserMenu ? 'true' : null"
            >
                <AwAvatar v-bind="user" />
            </span>
        </slot>

        <!-- submenu -->
        <div
            class="aw-layout-menu__submenu"
            :class="{ 'aw-layout-menu__submenu--hidden': !hasSubmenu }"
        >
            <slot name="user-menu" :userMenu="userMenu">
                <AwUserMenu
                    v-if="hasUserMenu"
                    class="aw-layout-menu__aw-user-menu"
                    aria-labelledby="user-menu"
                    tabindex="-1"
                />
            </slot>

            <slot
                v-if="!hideAside"
                name="submenu"
                v-bind="{ submenuTitle, submenu }"
            >
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
import { pathOr, keys, pick } from 'rambdax'
import AwIconMenuItem from './AwIconMenuItem.vue'
import AwUserMenu from './AwUserMenu.vue'
import AwNav from './AwNav.vue'

export default {
    name: 'AwLayoutMenu',

    components: {
        AwIconMenuItem,
        AwUserMenu,
        AwNav
    },

    props: {
        logo: {
            type: Object,
            default: null
        },

        menu: {
            type: Array,
            default: () => []
        },

        activeIndex: {
            type: Number,
            default: null
        },

        serviceMenu: {
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
        },

        hideAside: Boolean
    },

    computed: {
        submenu() {
            return pathOr([], [this.activeIndex, 'children'], this.menu)
        },

        hasSubmenu() {
            return this.submenu.length
        },

        submenuTitle() {
            return this.hasSubmenu
                ? pathOr('', [this.activeIndex, 'text'], this.menu)
                : ''
        },

        hasUserMenu() {
            return this.userMenu.length
        },

        menuVisible() {
            return pathOr(true, 'state.awesIo.mobileMenuOpened', this.$store)
        }
    },

    methods: {
        _getIconProps: pick(keys(AwIconMenuItem.props))
    }
}
</script>
