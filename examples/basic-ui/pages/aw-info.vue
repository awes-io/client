<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 4 }">
            <AwInfo />
        </AwGrid>
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
    head() {
        return {
            title: this._getMetaTitle(this.title),
            meta: [this._getMetaDescription(this.title)]
        }
    }
}
</script>
