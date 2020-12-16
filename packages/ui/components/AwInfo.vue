<template>
    <div>
        <!-- z-index for tooltip overlapped with aw-grid hacky padding -->
        <!-- TODO: remove z-index after aw-grid refactor to css grid -->
        <div v-if="label" class="mb-1 relative z-10">
            <span class="opacity-50 text-sm">{{ label }}</span>

            <!-- Customization of help icon -->
            <slot name="icon">
                <!-- question-circle icon -->
                <AwIcon
                    v-if="help"
                    v-tooltip:right.prepend="help"
                    class="px-1 py-0 opacity-50 hover:text-link hover:opacity-100"
                    name="info-circle"
                    size="md"
                />
            </slot>
        </div>
        <slot v-if="hasSlot" />
        <div v-else>
            {{ text || '—' }}
        </div>
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
    },
    data() {
        return {
            hasSlot: false
        }
    },
    created() {
        this.hasSlot = this.checkDefaultContent()
    },
    beforeUpdate() {
        this.hasSlot = this.checkDefaultContent()
    },
    methods: {
        checkDefaultContent() {
            const slot = this.$slots.default || []
            return slot.filter(element => {
                return element.tag || element.text.trim()
            }).length
        }
    }
}
</script>
