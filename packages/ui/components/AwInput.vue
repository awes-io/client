<template>
    <label
        class="flex"
        :class="[
            elClasses.base,
            `is-${type}`,
            ...wrapperClasses,
            {
                'has-icon': $slots.icon,
                'has-prefix': prefix,
                'has-postfix': postfix
            }
        ]"
    >
        <div
            v-if="prefix || $scopedSlots.prefix"
            class="bg-muted-darker flex items-center px-4 rounded-l"
        >
            <slot name="prefix">
                {{ prefix }}
            </slot>
        </div>

        <div class="relative w-full">
            <input
                :class="[elClasses.el, paddingClass]"
                v-bind="{ type, value: inputValue, ...skipAttr, ...$attrs }"
                :id="id || defaultId"
                :aria-describedby="errorText ? errorId : null"
                v-on="mergedListeners"
                v-tooltip.show.prepend="errorTooltip"
                ref="element"
            />
            <div v-if="!!label" :class="elClasses.label" :for="id || defaultId">
                {{ label }}
            </div>
            <span v-if="$slots.icon" :class="elClasses.icon">
                <slot name="icon" />
            </span>
        </div>

        <div
            v-if="postfix || $scopedSlots.postfix"
            class="bg-muted-darker flex items-center px-4 rounded-r"
        >
            <slot name="postfix">
                {{ postfix }}
            </slot>
        </div>
    </label>
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

        prefix: String,

        postfix: String,

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
