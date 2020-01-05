<template>
    <div>
        <div v-if="label" class="opacity-50 text-xs">{{ label }}</div>
        <slot>{{ text }}</slot>
    </div>
</template>

<script>
export default {
    name: 'AwInfo',
    props: {
        label: {
            type: String
        },
        text: {
            type: [String, Number],
            default: ''
        }
    }
}
</script>
