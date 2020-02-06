<template>
    <AwPage :title="headline">
        <AwInfo label="My awesome title">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </AwInfo>

        <AwCodeSnippet v-text="code" class="mt-3" />
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwInfo',
            headline: this._getTitle('AwInfo')
        }
    },

    computed: {
        code() {
            const arr = [
                '<AwInfo label="My awesome title">',
                '   Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                '</AwInfo>'
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
