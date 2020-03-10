<template>
    <div>
        <AwLayoutFrameCenter
            :logo='<%= JSON.stringify(options.logo) %>'
            :background='<%= JSON.stringify(options.backgroundFrameCenter) %>'
        >
            <Nuxt />
        </AwLayoutFrameCenter>
    </div>
</template>

<script>
import layoutMixin from './layout-mixin'

export default {
    name: 'LayoutFrameCenter',

    mixins: [layoutMixin]
}
</script>
