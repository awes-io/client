<template>
    <div>
        <h2>Calendar</h2>
        <AwCalendar v-model="dates" output-format="DD-MM-YYYY" range />

        <h2>Dumb calendar</h2>
        <AwCalendarView />

        <h2>Date input</h2>
        <AwForm>
            <AwDate v-model="date" :min="new Date().setDate(20)" />
            <AwDate
                v-model="range"
                class="mt-4"
                range
                :min="new Date('03/03/2020')"
                :max="new Date('06/06/2020')"
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
            dates: [new Date(2018, 0, 20)],
            date: new Date().setDate(23),
            range: {
                start: new Date().setDate(20),
                end: new Date().setDate(25)
            }
        }
    }
}
</script>
