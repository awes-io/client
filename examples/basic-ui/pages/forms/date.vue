<template>
    <AwPage :title="headline">
        <h2>Calendar</h2>
        <AwCalendar />

        <h2>Date input</h2>
        <AwForm>
            <AwDate
                name="date"
                :min="new Date().setDate(20)"
                :max="new Date().setDate(25)"
                :value="new Date()"
            />
        </AwForm>
    </AwPage>
</template>

<script>
export default {
    name: 'FormsCalendarPage',

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
