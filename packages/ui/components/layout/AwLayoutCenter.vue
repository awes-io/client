<template>
    <div
        id="layout-frame-center"
        class="layout layout--frame-center"
        v-bind="background"
    >
        <div class="layout__container mx-auto">
            <img
                v-if="logo"
                v-bind="logo"
                class="layout__center-logo hidden sm:block mt-auto"
            />

            <div
                class="layout__frame w-full my-auto"
                :class="{ 'sm:mt-8': logo }"
            >
                <slot />
            </div>

            <div
                v-html="$t('AwLayoutDefault.footer')"
                class="pt-8 text-sm"
            ></div>
        </div>

        <!-- offline frame -->
        <AwOfflineNotify />
    </div>
</template>

<script>
import { pathOr } from 'rambdax'
import AwOfflineNotify from '../AwOfflineNotify.vue'

export default {
    name: 'AwLayoutCenter',

    components: {
        AwOfflineNotify
    },

    computed: {
        isDark() {
            return this.$store.getters['awesIo/isDarkTheme']
        },

        logo() {
            return pathOr(
                null,
                ['$awes', '_config', this.isDark ? 'dark' : 'default', 'logo'],
                this
            )
        },

        background() {
            const { src, ...background } = pathOr(
                {},
                [
                    '$awes',
                    '_config',
                    this.isDark ? 'dark' : 'default',
                    'background'
                ],
                this
            )

            return src
                ? { ...background, style: { backgroundImage: `url(${src})` } }
                : background
        }
    }
}
</script>
