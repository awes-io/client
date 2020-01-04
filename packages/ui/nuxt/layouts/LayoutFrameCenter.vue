<template>
    <AwLayoutFrameCenter
        :logo='<%= JSON.stringify(options.logo) %>'
        :background='<%= JSON.stringify(options.backgroundFrameCenter) %>'
    >
        <Nuxt />
    </AwLayoutFrameCenter>
</template>

<script>
export default {
    name: 'LayoutFrameCenter'
}
</script>
