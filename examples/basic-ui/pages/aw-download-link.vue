<template>
    <AwPage :title="headline">
        <AwDownloadLink
            href="https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc"
            type-file="doc"
        />
    </AwPage>
</template>

<script>
export default {
    name: 'DownloadLink',

    data() {
        return {
            title: 'AwDownloadLink',
            headline: this._getTitle('AwDownloadLink')
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

<style></style>
