<template>
    <AwLayoutDefault :menu="mainMenu">
        <!-- notification -->
        <template #before-header>
            <Transition name="collapse">
                <div
                    v-if="notification"
                    class="layout__notification"
                    :class="`bg-${notification.type}`"
                >
                    {{ notification.text }}

                    <button
                        class="layout__close p-1"
                        @click="
                            $store.commit('awesIo/CLOSE_HEADER_NOTIFICATION')
                        "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                d="M19 2l-1-1-8 8-8-8-1 1 8 8-8 8 1 1 8-8 8 8 1-1-8-8 8-8z"
                            />
                        </svg>
                    </button>
                </div>
            </Transition>
        </template>

        <!-- navbar -->
        <template #navbar>
            <!-- profile button -->
            <AwUserMenu
                :avatar="(user.avatar && user.avatar.w96) || ''"
                :name="user.name"
                :dark-theme="isDarkTheme"
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
        </template>

        <!-- view -->
        <Nuxt />
    </AwLayoutDefault>
</template>

<script>
import { mapGetters } from 'vuex'
import { pathOr } from 'rambdax'
import layoutMixin from './layout-mixin'

export default {
    name: 'default',

    mixins: [layoutMixin],

    computed: {
        ...mapGetters('awesIo', [
            'mainMenu',
            'userMenu',
            'userMenuAdditional',
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
        }
    }
}
</script>
