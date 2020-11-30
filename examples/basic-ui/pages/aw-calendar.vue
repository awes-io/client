<template>
    <AwPage :title="headline">
        <AwGrid :col="{ lg: 2 }">
            <AwCalendar v-model="date" show-today />
        </AwGrid>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwCalendar',
            headline: this._getTitle('AwCalendar'),
            date: new Date()
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
