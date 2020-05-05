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

        <AwSelect
            v-model="selectedCategory"
            :options="categories"
            clearable
            class="mt-4"
            track-by="id"
            option-label="name"
            label="Label"
            placeholder="placeholder"
            @not-equal="createCategory"
        >
            <template #not-equal="{ searchPhrase }">
                <AwIcon name="plus" class="mr-2" />
                {{ $t('ui.services.modals.category_create') }}
                {{ searchPhrase }}
            </template>
        </AwSelect>
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
            selected: '3',
            selectedCategory: null,
            categories: [
                {
                    id: 1,
                    name: 'user one'
                },
                {
                    id: 2,
                    name: 'user tWO wo WO Wo wO'
                },
                {
                    id: 3,
                    name: 'test One'
                },
                {
                    id: 4,
                    name: 'test two'
                }
            ]
        }
    },

    head() {
        return {
            title: this._getMetaTitle(this.title),
            meta: [this._getMetaDescription(this.title)]
        }
    },

    methods: {
        createCategory(e) {
            console.log('create', e)
        }
    }
}
</script>
