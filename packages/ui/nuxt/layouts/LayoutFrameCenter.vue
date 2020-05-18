<template>
    <div>
        <AwLayoutFrameCenter
            :logo='<%= JSON.stringify(options.logo) %>'
            :background='<%= JSON.stringify(options.backgroundDarkFrameCenter || options.backgroundFrameCenter) %>'
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

    created() {
        console.log(this.options)
    },

    computed: {
        background() {
            if (this.isDarkTheme) {
                return this.options.backgroundDarkFrameCenter || this.options.backgroundFrameCenter
            }
            return this.options.backgroundFrameCenter
        }
    }
}
</script>
