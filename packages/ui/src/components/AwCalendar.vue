<template>
    <AwCalendarDays
        :month="viewMonth"
        :year="viewYear"
        :selected="value"
        :disabled-days="mergedDisabledDays"
        @click:date="onDateClick"
    >
        <template #before="{ month, year }">
            <AwCalendarNav
                :month="month"
                :year="year"
                :disabled-prev="isDisabledPrev"
                :disabled-next="isDisabledNext"
                class="w-full px-2"
                @click:prev="shiftMonth(-1)"
                @click:next="shiftMonth(+1)"
            />
        </template>
    </AwCalendarDays>
</template>

<script>
import dayjs from 'dayjs'
import { F, anyPass } from 'rambdax'

export default {
    name: 'AwCalendar',

    props: {
        value: {
            type: [String, Number, Object, Date],
            default: null
        },

        min: {
            type: [String, Number, Object, Date],
            default: null
        },

        max: {
            type: [String, Number, Object, Date],
            default: null
        },

        disabledDays: {
            type: Function,
            default: F
        }
    },

    data() {
        return {
            viewDate: new Date()
        }
    },

    computed: {
        viewMonth() {
            return this.viewDate.getMonth()
        },

        viewYear() {
            return parseInt(this.viewDate.getFullYear())
        },

        minDayJs() {
            return this.min && dayjs(this.min)
        },

        maxDayJs() {
            return this.max && dayjs(this.max)
        },

        isDisabledPrev() {
            return this.min && this.inMinRange(this.viewDate)
        },

        isDisabledNext() {
            return this.max && this.inMaxRange(this.viewDate)
        },

        mergedDisabledDays() {
            const fns = [this.disabledDays]

            if (this.min) {
                const djsMin = dayjs(this.min)

                fns.push(date => djsMin.isAfter(dayjs(date), 'days'))
            }

            if (this.min) {
                const djsMax = dayjs(this.max)

                fns.push(date => djsMax.isBefore(dayjs(date), 'days'))
            }

            return anyPass(fns)
        }
    },

    created() {
        this.resetViewDate()
    },

    methods: {
        shiftMonth(offset = 0) {
            const method = offset > 0 ? 'add' : 'subtract'
            const date = dayjs(this.viewDate)[method](Math.abs(offset), 'month')

            this.viewDate = date.toDate()
        },

        resetViewDate() {
            const current = new Date(this.value)

            if (!isNaN(current.getTime())) {
                this.viewDate = current
            }
        },

        inMinRange(date) {
            return this.minDayJs
                ? this.minDayJs.isAfter(date, 'month') ||
                      this.minDayJs.isSame(date, 'month')
                : true
        },

        inMaxRange(date) {
            return this.minDayJs
                ? this.minDayJs.isBefore(date, 'month') ||
                      this.minDayJs.isSame(date, 'month')
                : true
        },

        onDateClick($event) {
            if (!$event.isDisabled) {
                this.$emit('input', $event.date)
            }
        }
    }
}
</script>
