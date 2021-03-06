<template>
    <AwInput v-bind="{ ...$props, ...$attrs, type }" v-on="mergedListeners">
        <template #icon>
            <AwButton
                key="eye"
                theme="icon"
                @click="type = isShown ? 'password' : 'text'"
            >
                <Transition name="fade-from-bottom" mode="out-in">
                    <AwIconSystemMono v-if="isShown" key="hide" name="eye-no" />
                    <AwIconSystemMono v-else key="show" name="eye" />
                </Transition>
            </AwButton>
        </template>
    </AwInput>
</template>

<script>
import TextFieldMixin from '@AwMixins/text-field'

const checkSpaces = (val) => {
    return !!val.match(/\s/g)
}

export default {
    name: 'FbPassword',

    mixins: [TextFieldMixin],

    data() {
        return {
            type: 'password'
        }
    },

    computed: {
        isShown() {
            return this.type === 'text'
        },

        mergedListeners() {
            return {
                ...this.$listeners,
                keydown: this.$listeners.keydown || this._onKeyDown,
                paste: this.$listeners.paste || this._onPaste
            }
        }
    },

    methods: {
        _onKeyDown(e) {
            if (e.key && checkSpaces(e.key)) {
                e.preventDefault()
            }
        },

        _onPaste(e) {
            const clipboard = e.clipboardData || window.clipboardData
            const text = clipboard.getData('text').trim()

            e.preventDefault()
            e.stopPropagation()

            const el = event.target
            const { selectionStart, selectionEnd, value } = el

            const textBefore = value.substring(0, selectionStart)
            const textAfter = value.substring(selectionEnd, value.length)
            const mergedText = textBefore + text + textAfter

            el.value = mergedText

            el.dispatchEvent(new Event('input'))

            // move cursor to correct position after paste
            this.$nextTick(() => {
                el.selectionStart = el.selectionEnd =
                    selectionStart + text.length
            })
        }
    }
}
</script>
