<template>
    <AwPage :title="headline">
        <div class="flex -mx-4">
            <div class="px-4">
                <AwRadio v-model="radio" label="Radio input one" value="one" />
                <AwRadio v-model="radio" label="Radio input two" value="two" />
            </div>
            <div class="px-4">
                <AwRadio
                    v-model="radio"
                    label="Radio error"
                    :error="radio !== 'error' ? inputError : ''"
                    value="error"
                />
                <AwRadio
                    v-model="radio"
                    label="Radio disabled"
                    value="three"
                    disabled
                />
            </div>
        </div>
        <pre class="mt-4">Radio value: {{ radio }}</pre>
    </AwPage>
</template>

<script>
export default {
    name: 'FormsRadioPage',

    data() {
        return {
            title: 'AwRadio',
            headline: this._getTitle('AwRadio'),
            inputError: 'Field error',
            radio: null
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
