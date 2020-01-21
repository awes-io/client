<template>
    <div>
        <div class="flex -mx-4">
            <div class="px-4">
                <AwRadio v-model="radio" label="Radio input one" value="one" />
                <AwRadio v-model="radio" label="Radio input two" value="two" />
            </div>
            <div class="px-4">
                <AwRadio
                    v-model="radio"
                    label="Radio error"
                    :error="radio !== 'error' && inputError"
                    value="error"
                />
                <AwRadio
                    v-model="radio"
                    label="Radio disabled"
                    value="two"
                    disabled
                />
            </div>
        </div>
        <pre class="mt-4">Radio value: {{ radio }}</pre>
    </div>
</template>

<script>
export default {
    name: 'FormsRadioPage',

    head() {
        return {
            title: 'AwRadio'
        }
    },

    data() {
        return {
            inputError: 'Field error',
            radio: null
        }
    }
}
</script>
