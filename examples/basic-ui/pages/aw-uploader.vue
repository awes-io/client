<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 4 }">
            <AwUploader url="url" />
        </AwGrid>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwUploader',
            headline: this._getTitle('AwUploader'),
            url: 'http://localhost:3000/'
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
