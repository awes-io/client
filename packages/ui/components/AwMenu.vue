<template>
    <nav class="aw-menu">
        <!-- menu -->
        <ul class="aw-menu__menu">
            <slot />
        </ul>

        <!-- logo -->
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
            <!-- <button class="block lg:hidden mr-4" @click="$emit('close')">
                <AwIcon name="close" size="lg" />
                <span class="sr-only">
                    {{ $t('AwLayoutDefault.toggleMenu') }}
                </span>
            </button> -->

            <RouterLink
                class="aw-menu__homelink truncate"
                :to="homeUrl"
                v-html="$t('AwLayoutDefault.caption')"
            />
        </div>
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
