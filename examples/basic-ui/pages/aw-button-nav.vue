<template>
    <AwPage :title="headline">
        <AwButtonNav :items="filters" />

        <AwCodeSnippet v-text="codeMarkup" class="mt-5" />
        <AwCodeSnippet v-text="codeJs" class="mt-1" language="js" />
    </AwPage>
</template>

<script>
export default {
    name: 'FilterPage',

    data() {
        return {
            title: 'AwButtonNav',
            headline: this._getTitle('AwButtonNav'),
            filters: [
                { text: 'Order default', href: { query: { orderBy: null } } },
                { text: 'Order by name', href: { query: { orderBy: 'name' } } },
                { text: 'Order by id', href: { query: { orderBy: 'id' } } }
            ]
        }
    },

    computed: {
        codeMarkup() {
            const arr = [
                '<template>',
                '   <AwButtonNav :items="filters" />',
                '</template>'
            ]
            return arr.join('\n')
        },

        codeJs() {
            const arr = [
                '<script>',
                'export default {',
                '   data() {',
                '       return {',
                '           filters: [',
                "               { text: 'Order default', href: { query: { orderBy: null } } },",
                "               { text: 'Order by name', href: { query: { orderBy: 'name' } } },",
                "               { text: 'Order by id', href: { query: { orderBy: 'id' } } }",
                '           ]',
                '       }',
                '   }',
                '}',
                '</' + 'script>'
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
