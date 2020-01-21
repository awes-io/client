<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 4 }">
            <AwAccordionFold />
        </AwGrid>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwAccordionFold',
            headline: this._getTitle('AwAccordionFold')
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
