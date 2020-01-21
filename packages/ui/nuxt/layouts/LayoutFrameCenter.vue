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
export default {
    name: 'LayoutFrameCenter'
}
</script>
