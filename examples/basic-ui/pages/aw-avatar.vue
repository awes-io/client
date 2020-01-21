<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 4 }">
            <AwAvatar />
        </AwGrid>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwAvatar',
            headline: this._getTitle('AwAvatar')
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
