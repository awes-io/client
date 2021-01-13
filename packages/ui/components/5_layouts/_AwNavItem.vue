<template>
    <Component :is="_linkComponent" v-bind="_linkAttrs">
        <slot />
    </Component>
</template>

<script>
import linkMixin from '@AwMixins/link'

export default {
    name: 'AwNavItem',

    mixins: [linkMixin]
}
</script>
