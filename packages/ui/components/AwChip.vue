<template>
    <div
        class="inline-flex items-center p-1 rounded-full border"
        :class="wrapClass"
    >
        <!-- icon -->
        <slot name="icon" v-bind="{ icon, fill, iconClass }">
            <AwIcon
                v-if="icon"
                :class="iconClass"
                class="p-1 rounded-full"
                size="xxs"
                :name="icon"
            />
        </slot>

        <!-- text -->
        <slot name="text" v-bind="{ text, fill }">
            <span
                v-if="text || $slots.default"
                class="text-xs uppercase leading-none mx-1 truncate"
            >
                <slot>{{ text }}</slot>
            </span>
        </slot>

        <!-- close -->
        <slot name="button" v-bind="{ hasButton }">
            <AwButton
                v-if="hasButton"
                theme="icon"
                class="rounded-full overflow-hidden -my-2 -mx-1"
                icon="close"
                size="xs"
                @click="$emit('close')"
            />
        </slot>
    </div>
</template>

<script>
export default {
    name: 'AwChip',

    props: {
        icon: {
            type: String,
            default: ''
        },

        text: {
            type: String,
            default: ''
        },

        color: {
            type: String,
            default: 'info'
        },

        fill: Boolean
    },

    computed: {
        wrapClass() {
            return this.fill
                ? `bg-${this.color} border-${this.color}`
                : `text-${this.color} border-${this.color}`
        },

        iconClass() {
            return this.fill
                ? `bg-on-${this.color} text-${this.color}`
                : `bg-${this.color}`
        },

        hasButton() {
            return typeof this.$listeners.close === 'function'
        }
    }
}
</script>
