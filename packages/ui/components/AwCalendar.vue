<template>
    <div class="aw-calendar" @click="onDateClick">
        <slot
            name="header"
            v-bind="{
                viewDate,
                isDisabledPrev,
                isDisabledNext,
                shiftMonth
            }"
        >
            <!-- nav buttons and current month and year -->
            <AwCalendarNav
                :month="viewDate.month()"
                :year="viewDate.year()"
                :disabled-prev="isDisabledPrev"
                :disabled-next="isDisabledNext"
                @click:prev="shiftMonth(-1)"
                @click:next="shiftMonth(+1)"
            />
        </slot>

        <AwCalendarWeekdays
            :first-day="firstDay"
            :weekday-names="$t('AwCalendar.weekdaysShort')"
        />

        <AwCalendarDays
            :first-day="firstDay"
            :month="viewDate.month()"
            :year="viewDate.year()"
            :day-class="_getDayClass"
            :day-disabled="_isDisabled"
        />

        <slot name="footer" />
    </div>
</template>

<script>
import calendarMixin from '../mixins/calendar'
import AwCalendarNav from './AwCalendarNav.vue'
import AwCalendarWeekdays from './AwCalendarWeekdays.vue'
import AwCalendarDays from './AwCalendarDays.vue'

export default {
    name: 'AwCalendar',

    mixins: [calendarMixin],

    components: {
        AwCalendarNav,
        AwCalendarWeekdays,
        AwCalendarDays
    },

    computed: {
        isDisabledPrev() {
            return (
                this._minDayjs && this.viewDate.isSame(this._minDayjs, 'month')
            )
        },

        isDisabledNext() {
            return (
                this._maxDayjs && this.viewDate.isSame(this._maxDayjs, 'month')
            )
        }
    }
}
</script>
