<template>
    <span
        class="inline-flex"
        @keydown.up="focusListItem(-1, $event)"
        @keydown.down="focusListItem(+1, $event)"
    >
        <button @click.stop="open">
            <slot name="selected" v-bind="selected">
                <AwChip :loading="loading" v-bind="selected">
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
        <AwDropdown :show.sync="isOpened" tag="span" class="block p-2 -mx-2">
            <button
                v-for="({ id, text, ...props }, i) in options"
                :key="id || `chip-${i}`"
                class="block w-full text-left my-px rounded hover:bgcolor-muted focus:bgcolor-muted-dark"
                :class="{ 'bgcolor-info-light': id === value }"
                data-select-chip
                @click.stop="select(id)"
            >
                <slot
                    name="option"
                    v-bind="{ id, text, ...props, index: i, select }"
                >
                    <AwChip :text="noText ? '' : text" v-bind="props" />
                </slot>
            </button>
        </AwDropdown>
    </span>
</template>

<script>
import { omit } from 'rambdax'
import { validateBySchema } from '../assets/js/component'

export default {
    name: 'AwChipSelect',

    props: {
        value: {
            type: Number,
            required: true
        },

        options: {
            type: Array,
            required: true,
            validator: validateBySchema([
                { id: 'number', 'color?': 'string', 'text?': 'string' }
            ])
        },

        readonly: Boolean,

        noText: Boolean,

        loading: Boolean,

        disabled: Boolean
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
            if (!this.isDisabled && !this.isOpened) {
                this.isOpened = true
                this.$nextTick(this.focusListItem)
            }
        },

        select(id) {
            if (!this.isDisabled && id !== this.value) {
                this.$emit('input', id)
            }

            this.isOpened = false
        },

        focusListItem(offset = 0, $event) {
            if (!this.isOpened) return

            const buttons = Array.from(
                this.$el.querySelectorAll('button[data-select-chip')
            )
            const active = document.activeElement
            const activeIndex = buttons.indexOf(active)
            let nextIndex

            if (activeIndex < 0) {
                nextIndex = this.options.findIndex(
                    ({ id }) => id === this.value
                )
            } else {
                nextIndex = activeIndex + offset
            }

            const button = buttons[nextIndex]

            if (button) {
                if ($event) {
                    $event.preventDefault()
                    $event.stopPropagation()
                }
                button.focus()
            }
        }
    }
}
</script>
