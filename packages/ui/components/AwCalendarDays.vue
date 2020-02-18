<template>
    <div class="calendar" @click="clickHandler">
        <slot name="before" v-bind="{ month, year }" />

        <!-- weekdays names -->
        <span
            v-for="weekDay in weekDays"
            :key="weekDay"
            class="calendar__weekday"
        >
            {{ weekDay }}
        </span>

        <!-- days -->
        <template v-for="({ timestamp, ...dayProps }, index) in dates">
            <slot v-bind="{ ...dayProps, timestamp, index }">
                <AwCalendarDay
                    :key="timestamp"
                    v-bind="{ ...dayProps, index }"
                />
            </slot>
        </template>

        <slot name="after" />
    </div>
</template>

<script>
import { F, isNil } from 'rambdax'
import dayjs from 'dayjs'
import AwCalendarDay from './AwCalendarDay.vue'

export default {
    name: 'AwCalendarDays',

    components: {
        AwCalendarDay
    },

    props: {
        year: {
            type: Number,
            default() {
                return parseInt(new Date().getFullYear())
            }
        },

        month: {
            type: Number,
            default() {
                return parseInt(new Date().getMonth())
            }
        },

        firstDay: {
            type: Number,
            default: 1
        },

        weekdays: {
            type: Array,
            default() {
                return this.$t('AwCalendar.weekdaysShort')
            }
        },

        disabledDays: {
            type: Function,
            default: F
        },

        selected: {
            type: [Object, Date, Array],
            default: null
        }
    },

    computed: {
        dates() {
            return this.getCalendarDates(
                this.year,
                this.month,
                this.firstDay
            ).map(date => {
                const month = date.getMonth()

                return {
                    date,
                    timestamp: date.getTime(),
                    day: date.getDate(),
                    isOutside: this.month !== month,
                    isDisabled: this.disabledDays(date),
                    isActive: this.isActive(date)
                }
            })
        },

        weekDays() {
            return this.dates.slice(0, 7).map(({ date }) => {
                return this.weekdays[date.getDay()]
            })
        }
    },

    methods: {
        /**
         * Creates an array of 42 days to display a calendar
         *
         * @param  {number} month            from `0` to `11` - month to render, required
         * @param  {number} year             in `XXXX` format - year to render, required
         * @param  {number} [firstDay = 0]   from 0 to 6, e.g. `0 === Sunday`, `1 === Monday`, ...
         *                                   default `0`
         *
         * @return {Array<Date>}             Array of Date objects of given month and year
         *                                   with edge days to fullfill 6 x 7 square table
         */
        getCalendarDates(year, month, firstDay) {
            const result = []

            let day = new Date(year, month)

            day.setDate(1 - day.getDay() + firstDay)

            // Modify first day if not correct
            if (firstDay && day.getDate() === firstDay + 1) {
                day.setDate(firstDay - 6)
            }

            // 6 weeks always displayed to keep size
            for (let i = 0; i < 6 * 7; ++i) {
                result.push(new Date(day))
                day.setDate(day.getDate() + 1)
            }

            return result
        },

        clickHandler($event) {
            let button = $event.target

            // get original button
            if (button && !button.hasAttribute('data-index')) {
                button = button.closest('[data-index]')
            }

            // break if no button found
            if (!button) return

            const index = parseInt(button.getAttribute('data-index'))
            const dateObject = this.dates[index]

            this.$emit('click:date', dateObject)
        },

        isActive(date) {
            if (isNil(this.selected)) return false

            const isSameDay = day => dayjs(date).isSame(day, 'day')

            return Array.isArray(this.selected)
                ? this.selected.some(isSameDay)
                : isSameDay(this.selected)
        }
    }
}
</script>
