<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 4 }">
            <AwSwitcher />
        </AwGrid>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwSwitcher',
            headline: this._getTitle('AwSwitcher')
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
