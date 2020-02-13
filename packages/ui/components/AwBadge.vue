<template functional>
    <div class="aw-badge inline-flex items-center">
        <!-- Content passed to component -->
        <slot></slot>
        <span
            v-show="
                !props.hideIfEmpty || (props.hideIfEmpty && !!(props.text * 1))
            "
            :class="[`bg-${props.color || 'brand'}`]"
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
        },

        // When set to `true`, badge will hide if text is empty or 0
        hideIfEmpty: {
            type: Boolean,
            default: false
        }
    }
}
</script>
