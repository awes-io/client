<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 4 }">
            <AwChip />
        </AwGrid>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwChip',
            headline: this._getTitle('AwChip')
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
