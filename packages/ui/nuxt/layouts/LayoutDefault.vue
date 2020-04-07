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
                    <span v-html="notification.text"></span>

                    <AwButton
                        class="layout__close"
                        icon="close"
                        theme="ghost"
                        content-class="p-2 text-surface"
                        @click="
                            $store.commit('awesIo/CLOSE_HEADER_NOTIFICATION')
                        "
                    ></AwButton>
                </div>
            </Transition>
        </template>

        <!-- navbar -->
        <template #navbar>
            <div class="flex items-center">
                <!-- navbar menu -->
                <ul class="hidden lg:flex list-none layout__navbar-list mr-8">
                    <li
                        v-for="{
                            component,
                            key,
                            props,
                            text,
                            listeners
                        } in navbarMenu"
                        :key="key"
                    >
                        <Component
                            :key="key"
                            :is="component"
                            v-bind="props"
                            v-on="listeners"
                        >
                            {{ typeof text === 'function' ? text() : text }}
                        </Component>
                    </li>
                </ul>

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
            </div>
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
            'navbarMenu',
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
