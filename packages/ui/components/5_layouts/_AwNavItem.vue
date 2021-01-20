<template>
    <Component :is="_linkComponent" v-bind="_linkAttrs" v-on="$listeners">
        <slot />
        <AwIconSystemMono v-if="_linkExternal" name="external" class="ml-1" />
    </Component>
</template>

<script>
import linkMixin from '@AwMixins/link'

export default {
    name: 'AwNavItem',

    mixins: [linkMixin]
}
</script>
