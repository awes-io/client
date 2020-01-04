<template>
    <div>
        <AwSelect
            :options="options"
            :disabled="disabled"
            label="Select something"
            v-model="selected"
            option-label="text"
            :option-value="optionValueProp"
        />

        <AwSwitcher label="Disable" v-model="disabled" />

        <AwSwitcher label="Set value to 'value'" v-model="optionValue" />

        <div class="content mt-4 -mx-2 flex">
            <div class="md:w-1/2 px-2">
                <p><strong>Selected:</strong></p>
                <pre>{{ selected }}</pre>
            </div>
            <div class="md:w-1/2 px-2">
                <p><strong>Markup example:</strong></p>
                <pre>{{ markup }}</pre>
            </div>
        </div>
    </div>
</template>

<script>
// to check equality, must be same object
const options = [
    { text: 'one', value: 1 },
    { text: 'two', value: 2 },
    { text: 'three', value: 3 },
    { text: 'one', value: 4 },
    { text: 'two', value: 5 },
    { text: 'three', value: 6 },
    { text: 'one', value: 7 },
    { text: 'two', value: 8 },
    { text: 'three', value: 9 },
    { text: 'one', value: 10 },
    { text: 'two', value: 11 },
    { text: 'three', value: 12 },
    { text: 'one', value: 13 },
    { text: 'two', value: 14 },
    { text: 'three', value: 15 }
]

export default {
    name: 'SelectObjectPage',

    data() {
        return {
            disabled: false,
            options,
            selected: options[1],
            optionValue: false
        }
    },

    computed: {
        optionValueProp() {
            return this.optionValue ? 'value' : null
        },

        markup() {
            return `<AwSelect
    label="Select something"
    :options="[{text: 'one', value: 1}, {text: 'two', value: 2}, ... ]"
    option-label="text"
${this.optionValue ? '    option-value="value"\n/>' : '/>'}`
        }
    },

    watch: {
        optionValue(isOn) {
            if (isOn) {
                this.selected = this.selected.value
            } else {
                this.selected = options.find(
                    ({ value }) => value === this.selected
                )
            }
        }
    }
}
</script>
