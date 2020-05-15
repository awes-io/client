<template>
    <AwInput v-bind="{ ...$props, ...$attrs, type }" v-on="mergedListeners">
        <template #icon>
            <AwButton
                key="eye"
                theme="icon"
                @click="type = isShown ? 'password' : 'text'"
            >
                <Transition name="fade-from-bottom" mode="out-in">
                    <AwIcon v-if="isShown" key="hide" name="eye-no" />
                    <AwIcon v-else key="show" name="eye" />
                </Transition>
            </AwButton>
        </template>
    </AwInput>
</template>

<script>
import TextFieldMixin from '../mixins/text-field'

const checkSpaces = val => {
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
            if (checkSpaces(e.key)) {
                e.preventDefault()
            }
        },

        _onPaste(e) {
            const clipboard = e.clipboardData || window.clipboardData
            const text = clipboard.getData('text')
            if (checkSpaces(text)) {
                e.preventDefault()
            }
        }
    }
}
</script>
