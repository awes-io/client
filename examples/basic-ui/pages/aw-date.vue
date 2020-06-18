<template>
    <AwPage :title="headline">
        <h2>Calendar</h2>
        <AwCalendar />

        <h2>Date input</h2>
        <AwForm>
            <AwDate
                name="date"
                v-model="date"
                :min="new Date().setDate(20)"
                :max="new Date().setDate(25)"
            />
        </AwForm>

        <h2>Prefix / Postfix</h2>
        <AwDate
            name="date"
            v-model="datePrefix"
            :min="new Date()"
            prefix="Prefix"
        />

        <AwDate
            name="date"
            v-model="datePostfix"
            :min="new Date()"
            postfix="Postfix"
            class="mt-4"
        />

        <h2>Clearable</h2>
        <AwDate name="date" v-model="dateClearable" clearable />
    </AwPage>
</template>

<script>
export default {
    name: 'FormsCalendarPage',

    data() {
        return {
            title: 'AwCalendar',
            headline: this._getTitle('AwCalendar'),
            date: new Date(),
            datePrefix: new Date(),
            datePostfix: new Date(),
            dateClearable: new Date()
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
