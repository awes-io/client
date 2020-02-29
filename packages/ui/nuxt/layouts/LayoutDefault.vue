<template>
    <AwLayoutDefault :menu="mainMenu">
        <!-- navbar -->
        <template slot="navbar">
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
import { pathOr } from 'rambdax'

export default {
    name: 'default',

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
        ...mapGetters('awesIo', ['mainMenu', 'userMenu', 'userMenuAdditional']),

        user() {
            return pathOr({}, 'state.auth.user', this.$store)
        }
    }
}
</script>
