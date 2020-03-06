<template>
    <Nuxt />
</template>

<script>
import { isType } from 'rambdax'

export default {
    name: 'LayoutEmpty',

    head() {
        if (isType('Function', this.$nuxtI18nSeo)) {
            return this.$nuxtI18nSeo()
        }
    }
}
</script>
