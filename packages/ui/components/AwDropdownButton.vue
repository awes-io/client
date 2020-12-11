<template>
    <!-- eslint-disable-next-line vue/require-component-is -->
    <component
        class="aw-dropdown-button"
        :class="[`aw-dropdown-button_${color}`, { 'is-active': active }]"
        v-bind="componentProps"
        v-on="$listeners"
    >
        <!-- content inside button -->

        <span class="flex items-start white" tabindex="-1">
            <slot>
                <span
                    v-if="$scopedSlots.icon"
                    class="w-6 text-left inline-block mr-1"
                >
                    <slot name="icon"> </slot>
                </span>
                {{ text }}
            </slot>
        </span>
    </component>
</template>

<script>
import AwLink from './AwLink.vue'

export default {
    name: 'AwDropdownButton',

    extends: AwLink,

    props: {
        /**
         * Color modification
         * @type {Object}
         */
        color: {
            /* 'default' / 'success' / 'warning' / 'danger' */
            type: String,
            /* 'default' */
            default: 'default',
            validator(color) {
                return [
                    'aw-dropdown-button_default',
                    'aw-dropdown-button_success',
                    'aw-dropdown-button_warning',
                    'aw-dropdown-button_error'
                ].includes(`aw-dropdown-button_${color}`)
            }
        },

        /**
         * Sets active state class
         */
        active: Boolean
    }
}
</script>
