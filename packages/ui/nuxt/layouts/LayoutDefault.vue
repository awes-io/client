<template>
    <AwLayoutDefault :menu="mainMenu">
        <!-- notification -->
        <template #before-header>
            <Transition name="collapse">
                <div
                    v-show="showNotify"
                    v-if="notification"
                    class="layout__notification"
                    :class="[
                        `bg-${notification.type || 'surface'}`,
                        { 'layout__notification--close': notification.closable }
                    ]"
                >
                    <span class="layout__notification-container container">
                        <span
                            v-html="notification.text"
                            class="block px-2 my-2"
                        ></span>

                        <span
                            class="flex justify-center flex-wrap max-w-full flex-shrink-0 mx-auto lg:mx-0"
                            v-if="Array.isArray(notification.buttons)"
                        >
                            <AwButton
                                v-for="({ listeners, ...btn },
                                i) in notification.buttons"
                                :key="i"
                                v-bind="btn"
                                v-on="listeners"
                                size="sm"
                                class="m-2"
                            />
                        </span>

                        <button
                            v-if="notification.closable"
                            class="layout__close"
                            @click="showNotify = false"
                        >
                            <svg
                                width="16"
                                height="16"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                                tabindex="-1"
                            >
                                <path
                                    d="M19 2l-1-1-8 8-8-8-1 1 8 8-8 8 1 1 8-8 8 8 1-1-8-8 8-8z"
                                />
                            </svg>
                        </button>
                    </span>
                </div>
            </Transition>
        </template>

        <!-- navbar -->
        <template #navbar>
            <div class="flex items-center">
                <!-- navbar menu -->
                <ul
                    v-if="Object.keys(navbarMenu).length"
                    class="hidden lg:flex list-none layout__navbar-list mr-8"
                >
                    <li
                        v-for="{
                            component,
                            key,
                            props,
                            href = null,
                            text = '',
                            listeners
                        } in navbarMenu"
                        :key="key"
                    >
                        <Component
                            :key="key"
                            :is="component"
                            :href="typeof href === 'function' ? href() : href"
                            v-bind="props"
                            v-on="listeners"
                        >
                            {{ typeof text === 'function' ? text() : text }}
                        </Component>
                    </li>
                </ul>

                <!-- profile button -->
                <AwUserMenu
                    :avatar="user.avatar"
                    :name="user.name"
                    :dark-theme="isDarkTheme"
                    @switch-dark-theme="isDarkTheme = $event"
                >
                    <Component
                        v-for="{
                            component,
                            key,
                            props: { text, href = null, ...props }
                        } in userMenu"
                        :key="key"
                        :is="component"
                        :href="typeof href === 'function' ? href() : href"
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

    data() {
        return {
            showNotify: false
        }
    },

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
            return pathOr(null, '$store.state.awesIo.headerNotification', this)
        }
    },

    watch: {
        notification: {
            handler(data) {
                this.showNotify = !!data
            },
            immediate: true
        }
    }
}
</script>
