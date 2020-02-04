<template functional>
    <div class="aw-badge inline-flex items-center">
        <!-- Content passed to component -->
        <slot></slot>
        <span
            :class="[`bg-${props.color}`]"
            class="
                rounded-full py-1 px-2 mx-1 text-xs leading-none min-h-badge min-w-badge
                inline-flex items-center justify-center font-semibold font-body
            "
        >
            {{ props.text }}
            <AwIcon v-if="props.icon" :name="props.icon" size="xs" />
        </span>
    </div>
</template>

<script>
export default {
    name: 'AwBadge',

    props: {
        // Text inside badge
        text: {
            type: [String, Number],
            default: ''
        },

        // Icon name inside badge. See AwIcon component for available names
        icon: {
            type: String,
            default: ''
        },

        // Badge background color
        color: {
            type: String,
            default: 'brand'
        }
    }
}
</script>
