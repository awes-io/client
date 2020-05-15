<template>
    <AwLayoutSimple :menu="mainMenu">
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

        <!-- view -->
        <Nuxt />
    </AwLayoutSimple>
</template>

<script>
import { mapGetters } from 'vuex'
import { pathOr } from 'rambdax'
import layoutMixin from './layout-mixin'

export default {
    name: 'simple',

    mixins: [layoutMixin],

    computed: {
        ...mapGetters('awesIo', ['mainMenu', 'isHeaderNotificationShown']),

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
