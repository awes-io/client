<template>
    <AwPage :title="headline">
        <div class="flex -mx-4">
            <div class="px-4">
                <AwSwitcher
                    v-model="switcher"
                    label="Checkbox one"
                    value="one"
                />
                <AwSwitcher
                    v-model="switcher"
                    label="Checkbox two"
                    value="two"
                />
            </div>
            <div class="px-4">
                <AwSwitcher
                    v-model="switcher"
                    label="Checkbox error"
                    value="three"
                    :error="!switcher.includes('error') && inputError"
                />
                <AwSwitcher
                    v-model="switcher"
                    label="Checkbox disabled"
                    value="four"
                    :disabled="disabled"
                />
            </div>
        </div>
        <pre class="mt-4">Switcher value: {{ switcher }}</pre>

        <h3>Example usage</h3>

        <AwCodeSnippet v-text="codeSwitcher" class="mt-3" />
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwSwitcher',
            headline: this._getTitle('AwSwitcher'),
            switcher: [],
            inputError: 'Error',
            disabled: true
        }
    },

    computed: {
        codeSwitcher() {
            const arr = [
                '<AwSwitcher',
                '    v-model="switcher"',
                '    label="Checkbox one"',
                '    value="one"',
                '/>',
                '\n<!-- With Error -->',
                '<AwSwitcher',
                '    v-model="switcher"',
                '    label="Checkbox error"',
                '    value="three"',
                '    :error="true"',
                '/>',
                '\n<!-- Disabled -->',
                '<AwSwitcher',
                '    v-model="switcher"',
                '    label="Checkbox error"',
                '    value="four"',
                '    disabled',
                '/>'
            ]
            return arr.join('\n')
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
