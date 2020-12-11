<template>
    <div class="aw-text-field is-textarea" :class="_wrapperClasses">
        <textarea
            class="aw-text-field__element p-3"
            v-bind="{ value: inputValue, ...skipAttr, ...$attrs }"
            :id="id || defaultId"
            :aria-describedby="errorText ? errorId : null"
            v-tooltip.show.prepend="errorTooltip"
            v-on="mergedListeners"
            ref="element"
        /><label
            v-if="!!label"
            class="aw-text-field__label"
            :for="id || defaultId"
        >
            {{ label }}
        </label>
    </div>
</template>

<script>
import autosize from 'autosize'
import TextFieldMixin from '../mixins/text-field'

export default {
    name: 'AwTextarea',

    mixins: [TextFieldMixin],

    mounted() {
        this.$nextTick(() => {
            autosize(this.$refs.element)
        })
    },

    computed: {
        _wrapperClasses() {
            return [...this.wrapperClasses, { 'has-label': !!this.label }]
        }
    },

    beforeDestroy() {
        autosize.destroy(this.$refs.element)
    }
}
</script>
