<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 4 }">
            <AwCalendar />
        </AwGrid>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwCalendar',
            headline: this._getTitle('AwCalendar')
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
