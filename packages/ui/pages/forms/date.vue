<template>
    <div>
        <h2>Calendar</h2>
        <AwCalendar v-model="dates" output-format="DD-MM-YYYY" />

        <h2>Date input</h2>
        <AwForm>
            <AwDate
                name="date"
                :min="new Date().setDate(20)"
                :value="new Date().setDate(23)"
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
            dates: [new Date(2018, 0, 20)]
        }
    }
}
</script>
