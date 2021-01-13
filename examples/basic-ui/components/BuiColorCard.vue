<template>
    <div
        v-tooltip:top="text"
        :class="`bg-${color}`"
        class="h-16 rounded-md font-extrabold text-white flex justify-center items-center"
    >
        <span>{{ color }}</span>
    </div>
</template>

<script>
export default {
    name: 'BuiColorCard',
    props: {
        color: {
            type: String,
            default: 'brand'
        },
        text: {
            type: String,
            default: ''
        }
    }
}
</script>
