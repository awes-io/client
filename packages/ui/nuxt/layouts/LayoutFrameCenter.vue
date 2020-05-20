<template>
    <div>
        <AwLayoutFrameCenter
            :logo="options.logo"
            :background="background"
        >
            <Nuxt />
        </AwLayoutFrameCenter>
    </div>
</template>

<script>
import layoutMixin from './layout-mixin'

export default {
    name: 'LayoutFrameCenter',

    mixins: [layoutMixin],

    computed: {
        options() {
            return <%= JSON.stringify(_.pick(options, [ 'backgroundDarkFrameCenter', 'backgroundFrameCenter', 'logo' ])) %>
        },

        background() {
            if (this.isDarkTheme) {
                return this.options.backgroundDarkFrameCenter || this.options.backgroundFrameCenter
            }
            return this.options.backgroundFrameCenter
        }
    }
}
</script>
