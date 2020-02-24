<template>
    <div class="aw-text-field is-textarea" :class="wrapperClasses">
        <textarea
            class="aw-text-field__element p-3"
            v-bind="{ value: inputValue, ...skipAttr, ...$attrs }"
            :id="id || defaultId"
            :aria-describedby="errorText ? errorId : null"
            v-tooltip.show="errorTooltip"
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
import TextFieldMixin from '../mixins/text-field'

export default {
    name: 'AwTextarea',

    mixins: [TextFieldMixin]
}
</script>
