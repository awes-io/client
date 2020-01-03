<template>
    <div :class="css.wrap" @click="clickHandler">
        <slot name="before" v-bind="{ month, year }" />

        <!-- weekdays names -->
        <span
            v-for="weekDay in weekDays"
            :key="weekDay"
            :class="[css.cell, css.weekday]"
        >
            {{ weekDay }}
        </span>

        <!-- days -->
        <button
            v-for="({ date, day, timestamp, isOutside, isDisabled, isActive },
            i) in dates"
            :key="timestamp"
            type="button"
            :data-index="i"
            :class="[
                css.cell,
                _getStateClasses(isOutside, isDisabled, isActive)
            ]"
        >
            <slot v-bind="{ date, day, timestamp, isOutside, isDisabled }">
                {{ day }}
            </slot>
        </button>

        <slot name="after" />
    </div>
</template>

<script>
import { F, split, uniq } from 'rambdax'
import dayjs from 'dayjs'

export default {
    name: 'AwCalendarDays',

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
            type: [String, Number, Object, Date],
            default: null
        }
    },

    computed: {
        css() {
            return {
                wrap: 'flex flex-wrap py-2 bg-surface',
                cell: 'block text-center w-1/7 p-1',
                weekday: 'uppercase text-xs pb-3 border-b opacity-80',
                dayOutside: 'opacity-20 pointer-events-none cursor-default',
                dayDisabled: 'opacity-20 pointer-events-none cursor-default',
                dayActive: 'bg-success'
            }
        },

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
        },

        selectedDayJs() {
            return this.selected && dayjs(this.selected)
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
                button = button.closest('data-index')
            }

            // break if no button found
            if (!button) return

            const index = parseInt(button.getAttribute('data-index'))
            this.$emit('click:date', this.dates[index])
        },

        isActive(date) {
            return this.selected
                ? this.selectedDayJs.isSame(date, 'day')
                : false
        },

        _getStateClasses(isOutside, isDisabled, isActive) {
            const css = this.css
            const classes = []
                .concat(isOutside ? split(' ', css.dayOutside) : [])
                .concat(isDisabled ? split(' ', css.dayDisabled) : [])
                .concat(isActive ? split(' ', css.dayActive) : [])

            return uniq(classes)
        }
    }
}
</script>
