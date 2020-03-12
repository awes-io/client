<template>
    <AwPage :title="headline">
        <AwSelect
            :options="options"
            :disabled="disabled"
            label="Select something"
            v-model="selected"
            option-label="text"
            :track-by="optionValueProp"
        />

        <AwSwitcher label="Disable" v-model="disabled" />

        <AwSwitcher label="Set value to 'value'" v-model="optionValue" />

        <div class="md:w-1/2 px-2 mt-4">
            <p><strong>Selected:</strong></p>
            <pre>{{ selected }}</pre>
        </div>

        <div class="px-2 mt-4">
            <p><strong>Markup example:</strong></p>
            <AwCodeSnippet v-text="markup" />
        </div>
    </AwPage>
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
            title: 'AwSelect',
            headline: this._getTitle('AwSelect'),
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
            const arr = [
                '<AwSelect',
                '   label="Select something"',
                "   :options=\"[{text: 'one', value: 1}, {text: 'two', value: 2}, ... ]\"",
                '   option-label="text"',
                `${this.optionValue ? '   track-by="value"\n/>' : '/>'}`
            ]
            return arr.join('\n')
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
    },

    head() {
        return {
            title: this._getMetaTitle(this.title),
            meta: [this._getMetaDescription(this.title)]
        }
    }
}
</script>
