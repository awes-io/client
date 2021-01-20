<template>
    <div
        v-if="$auth.loggedIn && user"
        class="aw-user-menu"
        @focusout="_closeOnBlur"
        @mouseenter="_cancelClose"
        @mouseleave="closeDropdown"
    >
        <slot name="user">
            <button
                class="aw-user-menu__user focus-outline"
                aria-haspopup="true"
                :aria-label="$t('AwUserMenu.openMenu')"
                @focus="openDropdown"
                @mouseenter="openDropdown"
            >
                <AwAvatar v-bind="user" tabindex="-1" />
            </button>
        </slot>

        <slot name="user-menu">
            <AwDropdown
                ref="dropdown"
                class="aw-user-menu__menu"
                :options="{
                    placement: 'right-end',
                    modifiers: [{ name: 'offset', options: { offset: [4, 8] } }]
                }"
            >
                <div class="aw-user-menu__header">
                    <AwUserpic v-bind="user" big-image />
                </div>
                <AwSwitcher
                    v-model="isDarkTheme"
                    :label="$t('AwUserMenu.darkTheme')"
                    class="aw-user-menu__theme-switcher"
                />

                <template v-for="(item, i) in userMenu">
                    <!-- eslint-disable-next-line vue/require-component-is -->
                    <Component v-if="item.is" :key="'cmp-' + i" v-bind="item" />
                    <AwNavItem
                        v-else
                        :key="i"
                        v-bind="_pickButtonProps(item)"
                        class="aw-user-menu__nav-item"
                    >
                        <AwIcon
                            v-if="item.icon"
                            :name="item.icon"
                            class="mr-1"
                        />
                        {{ item.text }}
                    </AwNavItem>
                </template>

                <AwNavItem
                    v-if="$auth.loggedIn"
                    class="aw-user-menu__nav-item"
                    @click="$auth.logout()"
                >
                    {{ $t('AwUserMenu.logout') }}
                </AwNavItem>
            </AwDropdown>
        </slot>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { viewOr, lensProp, omit } from 'rambdax'
import AwNavItem from '@AwLayouts/_AwNavItem.vue'

export default {
    name: 'AwUserMenu',

    components: {
        AwNavItem
    },

    inject: {
        layoutProvider: {
            default: null
        }
    },

    computed: {
        ...mapGetters('awesIo', ['user']),

        isDarkTheme: {
            get() {
                return this.$store.getters['awesIo/isDarkTheme']
            },

            set(val) {
                this.$store.commit('awesIo/SET_DARK_THEME', val)
            }
        },

        userMenu() {
            return viewOr([], lensProp('userMenu'), this.layoutProvider)
        },

        hasUserMenu() {
            return this.userMenu.length
        }
    },

    methods: {
        _pickButtonProps(props) {
            return omit('icon,children', props)
        },

        openDropdown() {
            clearTimeout(this._tm)
            this.$refs.dropdown.visible = true
        },

        closeDropdown() {
            this._tm = setTimeout(() => {
                this.$refs.dropdown.visible = false
            }, 120)
        },

        _closeOnBlur($event) {
            const relatedTarget = $event.relatedTarget

            if (!relatedTarget || !this.$el.contains(relatedTarget)) {
                this.$refs.dropdown.visible = false
            }
        },

        _cancelClose() {
            clearTimeout(this._tm)
        }
    }
}
</script>
