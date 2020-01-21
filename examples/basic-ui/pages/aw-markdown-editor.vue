<template>
    <AwPage :title="headline">
        <AwMarkdownEditor v-model="markdown" />
    </AwPage>
</template>

<script>
export default {
    name: 'MarkdownEditor',

    data() {
        return {
            title: 'AwMarkdownEditor',
            headline: this._getTitle('AwMarkdownEditor'),
            markdown: `## heading

paragraph _italic_

> quote **bold**
`
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
