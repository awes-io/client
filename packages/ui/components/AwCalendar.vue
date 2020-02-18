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
import { F, anyPass, isNil, startsWith, reject } from 'rambdax'
import AwCalendarDays from './AwCalendarDays.vue'
import AwCalendarNav from './AwCalendarNav.vue'

dayjs.extend(customParseFormat)

const isSameDay = date => day => day.isSame(date, 'day')

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
         * for example `YYYY-MM-DD[T]HH:mm:sszz`.
         * When working with `v-model`, this value may be omited,
         * and used only with `outputFormat`
         */
        parseFormat: {
            type: String,
            default: ''
        },

        /**
         * Which type the output value should be
         * When working with `v-model`, this value is used for parsing
         * `String` dates, if no `parseFormat` specified
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

        format() {
            return this.parseFormat || this.outputFormat
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
            const current = Array.isArray(this.value)
                ? this.value[0]
                : this.value

            // view current month if value is empty
            if (isNil(current)) {
                this.viewDate = new Date()
                return
            }

            const date = this.toDayjs(this.value)

            // validate date, or fallback to current
            if (date.isValid()) {
                this.viewDate = date.toDate()
            } else {
                this.viewDate = new Date()
            }
        },

        toDayjs(input) {
            if (this.format && typeof input === 'string') {
                return dayjs(input, this.format)
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

        onDateClick(dateObject) {
            // break if day is disabled
            if (dateObject.isDisabled) return

            const date = dateObject.date
            let _date

            if (Array.isArray(this.valueDayjs)) {
                if (dateObject.isActive) {
                    _date = reject(isSameDay(date), this.valueDayjs)
                } else {
                    _date = this.valueDayjs.concat(dayjs(date))
                }
            } else {
                _date = dayjs(date)
            }

            /**
             * @vuese
             * Fire on date click, returns picked date.
             * If an array is provided as value, adds/removes picked day from array.
             * @arg date in `outputFormat` or array of dates
             */
            this.$emit(
                'input',
                Array.isArray(this.valueDayjs)
                    ? _date.map(this.fromDayjs)
                    : this.fromDayjs(_date)
            )
        }
    }
}
</script>
