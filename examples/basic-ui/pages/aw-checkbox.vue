<template>
    <AwPage :title="headline">
        <div class="flex -mx-4">
            <div class="px-4">
                <AwCheckbox
                    v-model="checkboxNumber"
                    label="Checkbox number"
                    value="one"
                />
                <AwCheckbox
                    v-model="checkbox"
                    label="Checkbox one"
                    value="one"
                />
                <AwCheckbox
                    v-model="checkbox"
                    label="Checkbox two"
                    value="two"
                />
            </div>
            <div class="px-4">
                <AwCheckbox
                    v-model="checkbox"
                    label="Checkbox error"
                    :error="!checkbox.includes('error') && inputError"
                />
                <AwCheckbox
                    v-model="checkbox"
                    label="Checkbox disabled"
                    value="two"
                    disabled
                />
            </div>
        </div>
        <pre class="mt-4">Checkbox value: {{ checkbox }}</pre>
        <h4 class="mt-8 mb-4">Switcher</h4>
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
                    disabled
                />
            </div>
        </div>
        <pre class="mt-4">Switcher value: {{ switcher }}</pre>
    </AwPage>
</template>

<script>
export default {
    name: 'FormsCheckboxPage',

    data() {
        return {
            title: 'AwCheckbox',
            headline: this._getTitle('AwCheckbox'),
            inputError: 'Field error',
            checkbox: [],
            switcher: [],
            checkboxNumber: 1
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
