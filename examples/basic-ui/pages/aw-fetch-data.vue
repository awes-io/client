<template>
    <AwPage :title="headline">
        <AwSearch name="search" class="mb-3" />

        <AwFetchData
            :watch-params="['search']"
            url="/api/managers"
            style="min-height: 10vh"
        >
            <template #default="{ data }">
                <AwCard v-if="data" title="Managers">
                    <ul class="list-none">
                        <li v-for="manager in data" :key="manager.id">
                            {{ manager.first_name }}
                        </li>
                    </ul>
                </AwCard>
            </template>
        </AwFetchData>

        <AwCodeSnippet v-text="code" class="mt-8 shadow" :size="50" />
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwFetchData',
            headline: this._getTitle('AwFetchData')
        }
    },

    computed: {
        code() {
            const arr = [
                '<AwSearch name="search" class="mb-3" />',
                '',
                '<AwFetchData',
                '    :watch-params="[\'search\']"',
                '    url="/api/managers"',
                '    style="min-height: 10vh"',
                '>',
                '    <template #default="{ data }">',
                '        <AwCard v-if="data" title="Managers">',
                '            <ul class="list-none">',
                '                <li v-for="manager in data" :key="manager.id">',
                '                    {{ manager.first_name }}',
                '                </li>',
                '            </ul>',
                '        </AwCard>',
                '    </template>',
                '</AwFetchData>'
            ]
            return arr.join('\n')
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
