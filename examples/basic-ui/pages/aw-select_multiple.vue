<template>
    <AwPage :title="headline">
        <!-- v-model destructured into `:value` prop and `@input` event -->
        <AwSelect
            :options="options"
            :disabled="disabled"
            :value="selected"
            :clearable="clearable"
            :searchable="searchable"
            label="Select something"
            multiple
            option-label="label"
            track-by="id"
            @input="setSelected"
        />

        <p class="h4">Controls</p>
        <AwSwitcher label="Searchable" v-model="searchable" />
        <AwSwitcher label="Clearable" v-model="clearable" class="mt-2" />
        <AwSwitcher label="Disabled" v-model="disabled" class="mt-2" />

        <p class="h4">Radio list with same model</p>
        <AwCheckbox
            v-for="option in options"
            :key="option.id"
            :label="option.label"
            :value="option.id"
            v-model="selected"
        />
    </AwPage>
</template>

<script>
export default {
    name: 'SelectTextPage',

    data() {
        return {
            title: 'AwSelect',
            headline: this._getTitle('AwSelect'),
            disabled: false,
            searchable: true,
            clearable: false,
            options: [
                { id: '1', label: 'one' },
                { id: '2', label: 'two with long name' },
                { id: '3', label: 'three' },
                { id: '4', label: 'four' },
                { id: '5', label: 'five' },
                { id: '6', label: 'six' },
                { id: '7', label: 'seven' }
            ],
            selected: ['2', '3']
        }
    },

    head() {
        return {
            title: this._getMetaTitle(this.title),
            meta: [this._getMetaDescription(this.title)]
        }
    },

    methods: {
        setSelected(value, options) {
            this.selected = value
            console.log('value: ', value)
            console.log('options: ', options)
        }
    }
}
</script>
