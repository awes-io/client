<template>
    <div class="aw-calendar" @click="onClick">
        <AwCalendarWeekdays
            :first-day="firstDay"
            :weekday-names="$t('AwCalendar.weekdaysShort')"
        />

        <AwCalendarDays
            :first-day="firstDay"
            :month="month"
            :year="year"
            :day-class="dayClass"
            :day-disabled="dayDisabled"
        />
    </div>
</template>

<script>
import AwCalendarWeekdays from '@AwOrganisms/AwCalendar/_AwCalendarWeekdays.vue'
import AwCalendarDays from '@AwOrganisms/AwCalendar/_AwCalendarDays.vue'
import { getDateFromEvent } from '@AwMixins/calendar'

export default {
    name: '',

    components: {
        AwCalendarWeekdays,
        AwCalendarDays
    },

    props: AwCalendarDays.props,

    methods: {
        onClick($event) {
            const date = getDateFromEvent($event)

            if (date) {
                this.$emit('click:date', date)
            }
        }
    }
}
</script>
