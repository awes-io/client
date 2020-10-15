<template>
    <AwLayoutFrameScreen>
        <Nuxt />
    </AwLayoutFrameScreen>
</template>

<script>
import layoutMixin from './layout-mixin'

export default {
    name: 'LayoutFrameScreen',

    mixins: [layoutMixin]
}
</script>
