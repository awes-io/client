<template>
    <div>
        <h2>Calendar</h2>
        <AwCalendar v-model="dates" />

        <h2>Date input</h2>
        <AwForm>
            <AwDate
                name="date"
                :min="new Date().setDate(20)"
                :max="new Date().setDate(25)"
                :value="new Date()"
            />
        </AwForm>
    </div>
</template>

<script>
export default {
    name: 'FormsCalendarPage',

    head() {
        return {
            title: 'AwCalendar'
        }
    },

    data() {
        return {
            dates: [new Date(2018, 0, 9), new Date(2018, 0, 25)]
        }
    }
}
</script>
