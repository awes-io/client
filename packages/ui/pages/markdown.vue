<template>
    <AwPage title="AwMarkdownEditor">
        <AwMarkdownEditor v-model="markdown" />
    </AwPage>
</template>

<script>
export default {
    name: 'MarkdownEditor',

    head() {
        return {
            title: 'AwMarkdownEditor'
        }
    },

    data() {
        return {
            markdown: `## heading

paragraph _italic_

> quote **bold**
`
        }
    }
}
</script>
