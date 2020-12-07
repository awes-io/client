<template>
    <AwPage :title="headline">
        <AwSelect
            v-model="selected"
            ref="select"
            :options="text => `/api/managers?search=${text}`"
            :disabled="disabled"
            track-by="id"
            option-label="first_name"
            label="Managers"
            placeholder="Select or create manager"
            create-confirm-text="Would you like to create new Manager?"
            clearable
            @preloaded="setActive"
            @not-found="crateManager"
            @not-equal="crateManager"
        >
            <template #option-label="{ optionLabel }">
                <span class="inline-flex items-center">
                    <AwIcon name="user" class="mr-2" /> {{ optionLabel }}
                </span>
            </template>

            <template #not-equal="{ searchPhrase }">
                <AwIcon name="plus" class="mr-2" />
                Create manager {{ searchPhrase }}
            </template>

            <template #not-found="{ searchPhrase }">
                <AwIcon name="plus" class="mr-2" />
                Create manager {{ searchPhrase }}
            </template>
        </AwSelect>

        <AwSwitcher label="Disable" v-model="disabled" />

        <AwCodeSnippet v-text="code" class="mt-8 shadow" :size="50" />
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

    computed: {
        code() {
            const arr = [
                '<AwSelect',
                '    v-model="selected"',
                '    ref="select"',
                '    :options="text => `/api/managers?search=${text}`"',
                '    :disabled="disabled"',
                '    track-by="id"',
                '    option-label="first_name"',
                '    label="Managers"',
                '    placeholder="Select or create manager"',
                '    create-confirm-text="Would you like to create new Manager?"',
                '    clearable',
                '    @preloaded="setActive"',
                '    @not-found="crateManager"',
                '    @not-equal="crateManager"',
                '>',
                '    <template #option-label="{ optionLabel }">',
                '        <span class="inline-flex items-center">',
                '            <AwIcon name="user" class="mr-2" /> {{ optionLabel }}',
                '        </span>',
                '    </template>',
                '',
                '    <template #not-equal="{ searchPhrase }">',
                '        <AwIcon name="plus" class="mr-2" />',
                '        Create manager {{ searchPhrase }}',
                '    </template>',
                '',
                '    <template #not-found="{ searchPhrase }">',
                '        <AwIcon name="plus" class="mr-2" />',
                '        Create manager {{ searchPhrase }}',
                '    </template>',
                '</AwSelect>'
            ]
            return arr.join('\n')
        }
    },

    methods: {
        setActive(list = []) {
            const selected = list.find(({ done }) => done)

            if (selected) {
                this.selected = selected.id
            }
        },

        async crateManager(name) {
            this.$refs.select.toggleLoader(true)

            const { data } = await this.$axios({
                method: 'post',
                url: '/api/managers/add',
                data: {
                    first_name: name
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
