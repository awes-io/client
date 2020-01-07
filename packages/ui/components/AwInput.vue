<template>
    <div
        :class="[
            elClasses.base,
            `is-${type}`,
            ...wrapperClasses,
            { 'has-icon': $slots.icon }
        ]"
    >
        <input
            :class="[elClasses.el, paddingClass]"
            v-bind="{ type, value: inputValue, ...$attrs }"
            :id="id || defaultId"
            :aria-describedby="errorText ? errorId : null"
            v-on="mergedListeners"
            ref="element"
        /><label v-if="!!label" :class="elClasses.label" :for="id || defaultId">
            {{ label }}
        </label>
        <span v-if="$slots.icon" :class="elClasses.icon">
            <slot name="icon" />
        </span>
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
import { AwInput as _config } from './_config'

export default {
    name: 'AwInput',

    _config,

    mixins: [TextFieldMixin],

    props: {
        type: {
            type: String,
            default: 'text',
            validator(type) {
                if (['checkbox', 'radio', 'date'].includes(type)) {
                    console.error(`Use <fb-${type}> instead`)
                    return false
                }
                return true
            }
        },

        size: {
            type: String,
            default: 'md',
            validator(type) {
                if (_config.sizes.includes(type)) {
                    return true
                }
                console.error(
                    `You must use only one from ${_config.sizes.join(', ')}`
                )
                return false
            }
        }
    },

    computed: {
        elClasses() {
            let base = this.$options._config.baseClass

            return {
                base,
                el: `${base}__element`,
                label: `${base}__label`,
                icon: `${base}__icon`
            }
        },

        paddingClass() {
            return this.size === 'md' ? 'p-3' : 'p-2'
        }
    }
}
</script>
