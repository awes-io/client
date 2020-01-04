<template>
    <main>
        <AwMarkdownEditor v-model="markdown" />
    </main>
</template>

<script>
export default {
    name: 'MarkdownEditor',

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
