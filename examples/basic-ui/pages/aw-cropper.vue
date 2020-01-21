<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 4 }">
            <AwCropper />
        </AwGrid>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwCropper',
            headline: this._getTitle('AwCropper')
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
