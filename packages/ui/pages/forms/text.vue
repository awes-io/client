<template>
    <AwPage title="Text inputs">
        <!-- text inputs -->
        <AwInput placeholder="Text input" />
        <AwInput
            class="mt-2"
            label="With label"
            placeholder="Text input"
            :disabled="null"
        />
        <AwInput
            class="mt-2"
            label="With icon"
            value="Input with icon"
            placeholder="Text input with icon"
        >
            <template #icon>
                <AwIcon name="external" size="sm" class="m-4" />
            </template>
        </AwInput>
        <AwInput
            class="mt-2"
            label="With icon"
            v-model="copyValue"
            placeholder="Text input with icon"
        >
            <template #icon>
                <AwButton theme="icon" icon="copy" @click="copyToClipboard()" />
            </template>
        </AwInput>
        <AwPassword class="mt-2" label="Password" value="123" />
        <AwInput
            class="mt-2"
            label="Disabled"
            value="Disabled input"
            disabled
        />
        <AwInput
            v-model="input"
            class="mt-2"
            label="With error"
            :error="inputError"
            placeholder="Text input"
        />
        <!-- <AwButton class="mt-2">Submit</AwButton> -->

        <!-- textarea -->
        <p class="h3 my-4">Textarea</p>
        <AwTextarea placeholder="Textarea" />
        <AwTextarea class="mt-2" label="With label" placeholder="Textarea" />
        <AwTextarea class="mt-2" label="Disabled" value="Disabled" disabled />
        <AwTextarea
            v-model="input"
            class="mt-2"
            label="With error"
            :error="inputError"
            placeholder="Textarea"
        />
    </AwPage>
</template>

<script>
import copyFn from 'clipboard-copy'

export default {
    name: 'TextInputs',

    head() {
        return {
            title: 'AwInput'
        }
    },

    data() {
        return {
            input: 'Value',
            inputError: 'Field error',
            copyValue: 'Input with icon'
        }
    },

    methods: {
        copyToClipboard() {
            copyFn(this.copyValue)
        }
    }
}
</script>
