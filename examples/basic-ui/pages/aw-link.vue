<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 4 }">
            <AwLink />
        </AwGrid>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwLink',
            headline: this._getTitle('AwLink')
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
