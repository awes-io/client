<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 4 }">
            <AwUploader />
        </AwGrid>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwUploader',
            headline: this._getTitle('AwUploader')
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
