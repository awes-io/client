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
                    close-on-action
                    class="mt-1 md:mt-0"
                    :options="{ placement: 'bottom-end' }"
                >
                    <p v-if="user.name" class="px-4 pt-4 font-bold">
                        {{ user.name }}
                    </p>
                    <AwGrid class="pt-4" :col="1" :gap="2">
                        <!-- eslint-disable prettier/prettier -->
                        <Component
                            v-for="{
                                component,
                                key,
                                props: { text, ...props }
                            } in userMenu"
                            :key="key"
                            :is="component"
                            v-bind="props"
                        >
                            {{ typeof text === 'function' ? text() : text }}
                        </Component>
                        <!-- eslint-enable prettier/prettier -->
                    </AwGrid>
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

    computed: {
        ...mapGetters('awesIo', ['mainMenu', 'userMenu']),

        user() {
            return pathOr({}, 'state.auth.user', this.$store)
        }
    }
}
</script>
