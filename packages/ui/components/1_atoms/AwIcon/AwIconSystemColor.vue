<template>
    <!-- eslint-disable vue/no-v-html -->
    <svg
        v-if="icon"
        :width="$attrs.width || icon.width"
        :height="$attrs.height || icon.height"
        :viewBox="icon.viewBox"
        v-html="icon.content"
    ></svg>
    <!-- eslint-enable vue/no-v-html -->
</template>

<script>
import icons from '@AwUtils/icons/multicolor'

export default {
    name: 'AwIconSystemColor',

    props: {
        // Name of the svg image
        name: {
            type: String,
            required: true
        }
    },

    computed: {
        icon() {
            return icons[this.name]
        }
    }
}
</script>
