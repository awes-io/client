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
            <template v-if="userMenu && userMenu.length">
                <button
                    class="focus:outline-none rounded-full focus:shadow-outline"
                    @click="$refs.userMenu.toggle()"
                >
                    <AwUserpic
                        :src="(user.avatar && user.avatar.w96) || ''"
                        :name="user.name"
                        hide-name
                    />
                </button>
                <AwDropdown
                    ref="userMenu"
                    class="mt-1 lg:mt-0"
                    :options="{ placement: 'bottom-end', modifiers }"
                    style="width: 300px"
                >
                    <div class="p-6 bg-light">
                        <h5 v-if="user.name" class="text-xl font-semibold">
                            {{ user.name }}
                        </h5>

                        <p
                            v-if="user.info"
                            class="mb-0 mt-1 text-xs text-grey leading-snug"
                            v-html="user.info"
                        ></p>
                    </div>

                    <hr />

                    <div class="px-6 pb-4 ">
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
                    </div>

                    <hr v-if="userMenuAdditional.length" />

                    <div v-if="userMenuAdditional.length" class="px-6 py-2">
                        <Component
                            v-for="{
                                component,
                                key,
                                listeners,
                                props: { text, ...props }
                            } in userMenuAdditional"
                            :key="key"
                            :is="component"
                            v-bind="props"
                            v-on="listeners"
                            class="block"
                        >
                            <span v-if="text">
                                {{ typeof text === 'function' ? text() : text }}
                            </span>
                        </Component>
                    </div>
                </AwDropdown>
            </template>
        </template>

        <!-- view -->
        <Nuxt />
    </AwLayoutDefault>
</template>

<script>
import { mapGetters } from 'vuex'
import { pathOr, isType } from 'rambdax'

export default {
    name: 'default',

    head() {
        if (isType('Function', this.$nuxtI18nSeo)) {
            return this.$nuxtI18nSeo()
        }
    },

    data: () => {
        return {
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 10]
                    }
                }
            ]
        }
    },

    computed: {
        ...mapGetters('awesIo', [
            'mainMenu',
            'userMenu',
            'userMenuAdditional',
            'isHeaderNotificationShown'
        ]),

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
