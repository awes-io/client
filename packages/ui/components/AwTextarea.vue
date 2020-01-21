<template>
    <div class="aw-text-field is-textarea" :class="wrapperClasses">
        <textarea
            class="aw-text-field__element p-3"
            v-bind="{ value: inputValue, ...$attrs }"
            :id="id || defaultId"
            :aria-describedby="errorText ? errorId : null"
            v-on="mergedListeners"
            ref="element"
        /><label
            v-if="!!label"
            class="aw-text-field__label"
            :for="id || defaultId"
        >
            {{ label }}
        </label>
        <slot name="error" v-if="errorText" :error="errorText">
            <span
                class="aw-error is-center has-pin-bottom-center"
                :id="errorId"
                @click="_onErrorClick"
            >
                {{ errorText }}
            </span>
        </slot>
    </div>
</template>

<script>
import TextFieldMixin from '../mixins/text-field'

export default {
    name: 'AwTextarea',

    mixins: [TextFieldMixin]
}
</script>
