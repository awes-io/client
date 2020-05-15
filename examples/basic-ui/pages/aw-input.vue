<template>
    <AwPage :title="headline">
        <!-- text inputs -->
        <AwInput placeholder="Text input" />

        <AwInput class="mt-2" label="With label" placeholder="Text input" />

        <AwInput
            class="mt-2"
            label="Prefix"
            placeholder="Text input"
            prefix="https://example.com/"
        />

        <AwInput
            class="mt-2"
            label="Postfix"
            placeholder="Text input"
            postfix=".com"
        />

        <section class="my-4">
            <AwCodeSnippet v-text="code" />
        </section>

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

        <!-- <AwSelect
            :options="[1, 2, 3, 4, 5]"
            class="my-6"
            label="Error overflow test"
        /> -->

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
    data() {
        return {
            title: 'AwInput',
            headline: this._getTitle('AwInput'),
            input: 'Value',
            inputError: 'Field error',
            copyValue: 'Input with icon'
        }
    },

    computed: {
        code() {
            const arr = [
                '<AwInput',
                '    class="mt-2"',
                '    label="Prefix"',
                '    placeholder="Text input"',
                '    prefix="https://example.com/"',
                '/>',
                '',
                '<AwInput',
                '    class="mt-2"',
                '    label="Postfix"',
                '    placeholder="Text input"',
                '    postfix=".com"',
                '/>'
            ]
            return arr.join('\n')
        }
    },

    methods: {
        copyToClipboard() {
            copyFn(this.copyValue)
        }
    },

    head() {
        return {
            title: this._getMetaTitle(this.title),
            meta: [this._getMetaDescription(this.title)]
        }
    }
}
</script>
