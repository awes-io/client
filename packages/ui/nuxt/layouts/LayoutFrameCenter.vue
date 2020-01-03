<template>
    <!-- eslint-disable -->
    <AwLayoutFrameCenter
        :logo="<%= JSON.stringify(options.logo) %>"
        :background="<%= JSON.stringify(options.backgroundFrameCenter) %>"
    >
        <Nuxt />
    </AwLayoutFrameCenter>
    <!-- eslint-enable -->
</template>

<script>
export default {
    name: 'LayoutFrameCenter'
}
</script>
