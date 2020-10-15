<template>
    <div
        id="layout-frame-center"
        class="layout layout--frame-center"
        :style="{ backgroundImage }"
        :class="background.class"
    >
        <div class="layout__container mx-auto">
            <img v-if="logo" v-bind="logo" class="hidden sm:block mt-auto" />

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
    </div>
</template>

<script>
export default {
    name: 'AwLayoutFrameCenter',

    props: {
        logo: {
            type: Object,
            default: () => ({
                src: '//placehold.it/70'
            })
        },

        background: {
            type: Object,
            default: () => ({})
        }
    },

    computed: {
        backgroundImage() {
            return this.background.src ? `url(${this.background.src})` : null
        }
    }
}
</script>
