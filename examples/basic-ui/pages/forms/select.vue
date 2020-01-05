<template>
    <AwPage :title="headline">
        <AwSelect
            :options="options"
            :disabled="disabled"
            label="Select something"
            v-model="selected"
        />

        <p class="h4">Disable</p>
        <AwSwitcher label="Disabled" v-model="disabled" />

        <p class="h4">Radio list with same model</p>
        <AwRadio
            v-for="option in options"
            :key="option"
            :label="option"
            :value="option"
            v-model="selected"
        />

        <AwSelect
            :options="options"
            :disabled="disabled"
            label="Select something"
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
            options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven'],
            selected: 'three'
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
