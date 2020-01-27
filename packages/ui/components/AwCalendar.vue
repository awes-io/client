<template>
    <AwCalendarDays
        :month="viewMonth"
        :year="viewYear"
        :selected="valueDayjs"
        :disabled-days="mergedDisabledDays"
        @click:date="onDateClick"
    >
        <template #before="{ month, year }">
            <!-- Calendar navigation -->
            <slot
                name="header"
                v-bind="{
                    month,
                    year,
                    isDisabledPrev,
                    isDisabledNext,
                    shiftMonth
                }"
            >
                <!-- nav buttons and current month and year -->
                <AwCalendarNav
                    :month="month"
                    :year="year"
                    :disabled-prev="isDisabledPrev"
                    :disabled-next="isDisabledNext"
                    @click:prev="shiftMonth(-1)"
                    @click:next="shiftMonth(+1)"
                />
            </slot>
        </template>
    </AwCalendarDays>
</template>

<script>
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { F, anyPass, isFalsy, startsWith } from 'rambdax'
import AwCalendarDays from './AwCalendarDays.vue'
import AwCalendarNav from './AwCalendarNav.vue'

dayjs.extend(customParseFormat)

export default {
    name: 'AwCalendar',

    components: {
        AwCalendarDays,
        AwCalendarNav
    },

    props: {
        /**
         * The date or dates in calendar
         */
        value: {
            type: [String, Number, Object, Date, Array],
            default: null
        },

        /**
         * Custom parse format for string dates,
         * for example `YYYY-MM-DD[T]HH:mm:sszz`
         */
        parseFormat: {
            type: String,
            default: ''
        },

        /**
         * Which type the output value should be
         */
        outputFormat: {
            // toDayjs / toDate / toJSON / format string
            type: [String],
            default: 'toDate'
        },

        /**
         * The minimum available date
         */
        min: {
            type: [String, Number, Object, Date],
            default: null
        },

        /**
         * The maximum available date
         */
        max: {
            type: [String, Number, Object, Date],
            default: null
        },

        /**
         * Function to filter available dates
         */
        disabledDays: {
            type: Function,
            // `() => false`
            default: F
        }
    },

    data() {
        return {
            viewDate: new Date()
        }
    },

    computed: {
        valueDayjs() {
            return Array.isArray(this.value)
                ? this.value.map(this.toDayjs)
                : this.toDayjs(this.value)
        },

        viewMonth() {
            return this.viewDate.getMonth()
        },

        viewYear() {
            return parseInt(this.viewDate.getFullYear())
        },

        minDayJs() {
            return this.min && this.toDayjs(this.min)
        },

        maxDayJs() {
            return this.max && this.toDayjs(this.max)
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
                fns.push(date =>
                    this.minDayJs.isAfter(this.toDayjs(date), 'days')
                )
            }

            if (this.min) {
                fns.push(date =>
                    this.maxDayJs.isBefore(this.toDayjs(date), 'days')
                )
            }

            return anyPass(fns)
        },

        fromDayjs() {
            if (this.outputFormat === 'toDayjs') {
                return _dayjs => _dayjs
            } else if (startsWith('to', this.outputFormat)) {
                return _dayjs => _dayjs[this.outputFormat]()
            } else {
                return _dayjs => _dayjs.format(this.outputFormat)
            }
        }
    },

    created() {
        this.resetViewDate()
    },

    methods: {
        shiftMonth(offset = 0) {
            const method = offset > 0 ? 'add' : 'subtract'
            const date = this.toDayjs(this.viewDate)[method](
                Math.abs(offset),
                'month'
            )

            this.viewDate = date.toDate()
        },

        resetViewDate() {
            const current = isFalsy(this.value)
                ? new Date()
                : Array.isArray(this.value)
                ? new Date(this.value[0])
                : new Date(this.value)

            if (this.toDayjs(current).isValid()) {
                this.viewDate = current
            }
        },

        toDayjs(input) {
            if (this.parseFormat && typeof input === 'string') {
                return dayjs(input, this.parseFormat)
            }

            return dayjs(input)
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
                /**
                 * @vuese
                 * Fire on date click, returns picked date.
                 * If an array is provided as value, adds/removes picked day from array.
                 * @arg date in `outputFormat` or array of dates
                 */
                this.$emit(
                    'input',
                    Array.isArray($event)
                        ? $event.map(this.fromDayjs)
                        : this.fromDayjs($event)
                )
            }
        }
    }
}
</script>
