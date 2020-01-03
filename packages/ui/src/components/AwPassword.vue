<template>
    <AwInput v-bind="{ ...$props, ...$attrs, type }" v-on="$listeners">
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
        }
    }
}
</script>
