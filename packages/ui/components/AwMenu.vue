<template>
    <nav class="aw-menu">
        <div class="aw-menu__logo">
            <!-- menu width toggler -->
            <button
                :aria-label="$t('AwLayoutDefault.shrinkMenu')"
                @click="$emit('toggle-width')"
                class="aw-menu__width-toggler"
            >
                <AwIconCaret size="10" />
            </button>

            <!-- close mobile menu toggler -->
            <!-- <button class="block md:hidden mr-4" @click="$emit('close')">
                <AwIcon name="close" size="lg" />
                <span class="sr-only">
                    {{ $t('AwLayoutDefault.toggleMenu') }}
                </span>
            </button> -->

            <RouterLink
                class="truncate focus:outline-none"
                :to="homeUrl"
                v-html="$t('AwLayoutDefault.caption')"
            />
        </div>

        <!-- menu -->
        <ul class="aw-menu__menu">
            <slot />
        </ul>
    </nav>
</template>

<script>
import AwIconCaret from '../assets/svg/components/caret.vue'

export default {
    name: 'AwMenu',

    components: {
        AwIconCaret
    },

    computed: {
        homeUrl() {
            return typeof this.localePath === 'function'
                ? this.localePath({ path: '/' })
                : '/'
        }
    }
}
</script>
