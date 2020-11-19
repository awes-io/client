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

        <p class="h4">Empty options list</p>
        <AwSelect :options="[]" label="Select something" v-model="selected" />

        <p class="h4">Invert theme</p>
        <AwSelect
            :options="options"
            :searchable="false"
            v-model="invertValue"
            size="sm"
            invert
        >
            <template #prefix>
                <div class="mx-4">xxx</div>
            </template>
        </AwSelect>

        <!-- <AwSelect
            :options="options"
            v-model="test"
            size="sm"
            class="mt-4"
            :searchable="false"
            dark
        >
            <template #prefix>
                PRE
            </template>

            <template #postfix>
                POST
            </template>
        </AwSelect> -->

        <!-- <AwSelect
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
        </AwSelect> -->
    </AwPage>
</template>

<script>
export default {
    name: 'SelectTextPage',

    data() {
        return {
            title: 'AwSelect',
            invertValue: null,
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
