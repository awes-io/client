<template>
    <div class="aw-layout">
        <AwMobileMenu
            v-if="!$screen.lg"
            v-bind="{ logo, menu: _menu, user, userMenu }"
            :show="mobileMenuOpened"
            @close="$store.commit('awesIo/TOGGLE_MOBILE_MENU', false)"
        >
            <template
                v-for="(index, name) in $scopedSlots"
                v-slot:[name]="data"
            >
                <slot :name="name" v-bind="data"></slot>
            </template>
        </AwMobileMenu>

        <AwLayoutMenu
            v-if="$screen.lg"
            v-bind="{
                logo,
                menu: _menu,
                activeIndex,
                serviceMenu,
                user,
                userMenu,
                hideAside
            }"
            class="aw-layout__aw-layout-menu"
        >
            <template
                v-for="(index, name) in $scopedSlots"
                v-slot:[name]="data"
            >
                <slot :name="name" v-bind="data"></slot>
            </template>
        </AwLayoutMenu>

        <!-- main -->
        <slot />
    </div>
</template>

<script>
import { pathOr } from 'rambdax'
import { mapState, mapGetters } from 'vuex'
import AwMobileMenu from '../AwMobileMenu.vue'
import AwLayoutMenu from '../AwLayoutMenu.vue'

export default {
    name: 'AwLayout',

    components: {
        AwMobileMenu,
        AwLayoutMenu
    },

    props: {
        hideAside: Boolean
    },

    provide() {
        return { layout: 'default' }
    },

    computed: {
        ...mapState('awesIo', ['mobileMenuOpened']),

        ...mapGetters('awesIo', [
            'menu',
            'activeMenu',
            'serviceMenu',
            'userMenu',
            'user'
        ]),

        _menu() {
            return this.menu.map(this._makeMenuItem)
        },

        activeIndex() {
            return this.menu.indexOf(this.activeMenu)
        },

        submenu() {
            return pathOr([], 'children', this.activeMenu).map(
                this._makeMenuItem
            )
        },

        submenuTitle() {
            return this.activeMenu ? this.$t(this.activeMenu.text) : ''
        },

        logo() {
            return pathOr(null, '_config.default.logo', this.$awes)
        }
    },

    methods: {
        _makeMenuItem({ children, text, ...item }) {
            return {
                ...item,
                text: this.$t(text),
                children: children && children.map(this._makeMenuItem)
            }
        }
    }
}
</script>
