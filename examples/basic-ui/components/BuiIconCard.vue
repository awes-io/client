<template>
    <div class="h-16 rounded-md text-white flex justify-left items-center">
        <slot></slot><span class="ml-4">{{ text }}</span>
    </div>
</template>

<script>
export default {
    name: 'BuiIconCard',
    props: {
        text: {
            type: String,
            default: ''
        }
    }
}
</script>
