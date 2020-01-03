<template>
    <AwLayoutDefault :menu="menuSorted" :caption="caption">
        <!-- navbar -->
        <template slot="navbar">
            <!-- search -->
            <!-- <div class="py-3 px-4">
                Search...
            </div> -->

            <!-- profile button -->
            <template v-if="userMenu && userMenu.length">
                <AwButton
                    theme="icon"
                    class="ml-auto bg-muted"
                    @click="$refs.userMenu.toggle()"
                >
                    <!-- <AwIcon name="user" /> -->
                    <img
                        class="max-w-full h-auto"
                        src="//placehold.it/250"
                        alt=""
                    />
                </AwButton>
                <AwDropdown
                    ref="userMenu"
                    close-on-action
                    :options="{ placement: 'bottom-end' }"
                    class="mt-1 md:mt-0"
                >
                    <p class="px-4 pt-4 font-bold">
                        User Name
                    </p>
                    <AwGrid class="p-4" :col="1" :gap="2">
                        <Component
                            v-for="({ component, props }, i) in userMenu"
                            :key="i"
                            :is="component"
                            v-bind="props"
                        />
                    </AwGrid>
                </AwDropdown>
            </template>
        </template>

        <!-- content -->
        <AwPage :title="$route.meta.title" :subnav="$route.meta.subnav">
            <Transition name="fade" mode="out-in">
                <RouterView />
            </Transition>
        </AwPage>
    </AwLayoutDefault>
</template>

<script>
import { mapState } from 'vuex/dist/vuex.esm.browser.js'

export default {
    name: 'App',

    computed: {
        ...mapState('awesIo', ['menu', 'userMenu', 'caption']),

        menuSorted() {
            return Object.values(this.menu)
        }
    }
}
</script>
