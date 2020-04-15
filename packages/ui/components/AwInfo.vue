<template>
    <div>
        <div v-if="label" class="mb-1">
            <span class="opacity-50 text-sm">{{ label }}</span>

            <!-- Customization of help icon -->
            <slot name="icon">
                <!-- question-circle icon -->
                <AwIcon
                    v-if="help"
                    v-tooltip:right="help"
                    class="px-1 py-0 opacity-50 hover:text-link hover:opacity-100"
                    name="question-circle"
                    size="xl"
                />
            </slot>
        </div>
        <slot>{{ text }}</slot>
    </div>
</template>

<script>
export default {
    name: 'AwInfo',
    props: {
        /**
         * Subtitle for the element
         */
        label: {
            type: String,
            default: ''
        },
        /**
         * Tooltip with help icon
         */
        help: {
            type: String,
            default: ''
        },
        /**
         * Text it's a string or number to print in content area
         */
        text: {
            type: [String, Number],
            default: ''
        }
    }
}
</script>
