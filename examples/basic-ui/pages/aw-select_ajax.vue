<template>
    <AwPage :title="headline">
        <AwSelect
            v-model="selected"
            ref="select"
            :options="text => `/api/select-ajax?s=${text}`"
            :disabled="disabled"
            track-by="id"
            option-label="name"
            label="Category"
            placeholder="Select or create category"
            :search-preload="[
                { id: 6, name: 'Preloaded 2' },
                { id: 5, name: 'Preloaded :)' }
            ]"
            @preloaded="setActive"
            @not-found="createCategory"
            @not-equal="createCategory"
        >
            <template #option-label="{ optionLabel }">
                <span class="inline-flex items-center">
                    <AwIcon name="user" class="mr-2" /> {{ optionLabel }}
                </span>
            </template>

            <template #not-equal="{ searchPhrase }">
                <AwIcon name="plus" class="mr-2" />
                Create category {{ searchPhrase }}
            </template>

            <template #not-found="{ searchPhrase }">
                <AwIcon name="plus" class="mr-2" />
                Create category {{ searchPhrase }}
            </template>
        </AwSelect>

        <AwSwitcher label="Disable" v-model="disabled" />
    </AwPage>
</template>

<script>
export default {
    name: 'SelectAjax',

    data() {
        return {
            title: 'AwSelect',
            headline: this._getTitle('AwSelect'),
            disabled: false,
            selected: 5
        }
    },

    methods: {
        setActive(list = []) {
            const selected = list.find(({ done }) => done)

            if (selected) {
                this.selected = selected.id
            }
        },

        async createCategory(name) {
            this.$refs.select.toggleLoader(true)

            const { data } = await this.$axios.request({
                method: 'post',
                url: '/api/select-ajax/add',
                data: {
                    name
                }
            })

            await this.$refs.select.fetch()

            this.selected = data.data.id
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
