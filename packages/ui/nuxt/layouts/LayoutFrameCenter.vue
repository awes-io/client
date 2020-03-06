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
import { isType } from 'rambdax'

export default {
    name: 'LayoutFrameCenter',

    head() {
        if (isType('Function', this.$nuxtI18nSeo)) {
            return this.$nuxtI18nSeo()
        }
    }
}
</script>
