<template>
    <span
        class="inline-flex"
        @keydown.up="_arrowFocusItem(-1, $event)"
        @keydown.down="_arrowFocusItem(+1, $event)"
        @focusout="onBlur"
    >
        <button
            class="focus-outline"
            :class="{ 'cursor-default': readonly }"
            data-arrow-focus
            @click.stop="open"
        >
            <slot name="selected" v-bind="selected">
                <AwChip
                    :loading="loading"
                    :filled="filled"
                    v-bind="selected"
                    tabindex="-1"
                    class="px-0"
                    :class="{ 'opacity-50 cursor-not-allowed': loading }"
                >
                    <AwSvgImage
                        v-if="loading"
                        name="spinner"
                        slot="left"
                        class="h-5 w-5"
                    />

                    <template #right>
                        <AwIcon
                            v-if="!readonly"
                            name="triangle-d"
                            size="lg"
                            class="transition-200 flex-shrink-0 text-disabled"
                            :class="{ 'rotate-180': isOpened }"
                        />
                    </template>
                </AwChip>
            </slot>
        </button>
        <AwDropdown
            :show.sync="isOpened"
            :options="{
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [-14, 0]
                        }
                    },
                    {
                        name: 'computeStyles',
                        options: {
                            adaptive: false
                        }
                    }
                ]
            }"
            tag="span"
            class="block"
        >
            <AwDropdownButton
                v-for="({ id, text, ...props }, i) in options"
                :key="id || `chip-${i}`"
                :active="id === value"
                data-arrow-focus
                @click.stop="select(id)"
            >
                <slot
                    name="option"
                    v-bind="{ id, text, ...props, index: i, select }"
                >
                    <AwChip
                        :text="noText ? '' : text"
                        v-bind="props"
                        :filled="filled"
                    />
                </slot>
            </AwDropdownButton>
        </AwDropdown>
    </span>
</template>

<script>
import { omit } from 'rambdax'
// import { validateBySchema } from '../assets/js/component'
import arrowFocusMixin from '../mixins/arrow-focus'

export default {
    name: 'AwChipSelect',

    mixins: [arrowFocusMixin],

    props: {
        value: {
            type: [Number, String],
            default: null
        },

        options: {
            type: Array,
            required: true
            // validator: validateBySchema([
            //     { id: 'any', 'color?': 'string', 'text?': 'string' }
            // ])
        },

        readonly: Boolean,

        noText: Boolean,

        loading: Boolean,

        disabled: Boolean,

        filled: Boolean
    },

    data() {
        return {
            isOpened: false
        }
    },

    computed: {
        selected() {
            const chip = this.options.find(({ id }) => id === this.value)
            return this.noText ? omit('text', chip) : chip
        },

        isDisabled() {
            return this.readonly || this.disabled || this.loading
        }
    },

    watch: {
        isDisabled(disabled) {
            if (disabled) this.isOpened = false
        }
    },

    methods: {
        open() {
            if (!this.isDisabled) {
                this.isOpened = !this.isOpened
            }
        },

        onBlur(e = {}) {
            const target = e.relatedTarget

            if (this.isOpened && !this.$el.contains(target)) {
                this.isOpened = false
            }
        },

        select(id) {
            if (!this.isDisabled && id !== this.value) {
                this.$emit('input', id)
            }

            this.isOpened = false
        }
    }
}
</script>
