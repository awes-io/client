import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { pathOr, startsWith, anyPass, F } from 'rambdax'

dayjs.extend(customParseFormat)

export const TIMESTAMP_ATTR = 'data-time'

export function getDateFromEvent($event) {
    let button = $event.target

    if (!button.hasAttribute(TIMESTAMP_ATTR)) {
        button = button.closest(`[${TIMESTAMP_ATTR}]`)
    }

    // break if no button
    if (!button) return false

    const timestamp = parseInt(button.getAttribute(TIMESTAMP_ATTR))
    return new Date(timestamp)
}

export default {
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
         * Fisrt day of week in calendar (0 is Sunday)
         */
        firstDay: {
            type: Number,
            default: 1
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
        },

        /**
         * Select range object { start, end }
         */
        range: Boolean
    },

    data() {
        return {
            viewDate: null,
            tempValue: null,
            hoverValue: null
        }
    },

    computed: {
        _isMultiple() {
            return !this.range && Array.isArray(this.value)
        },

        _valueDayjs() {
            if (!this.range) {
                return this._isMultiple
                    ? this.value.map(this._toDayjs)
                    : this._toDayjs(this.value)
            } else {
                return null
            }
        },

        _startDayjs() {
            if (this.tempValue) {
                return this.hoverValue &&
                    this.hoverValue.isBefore(this.tempValue)
                    ? this.hoverValue
                    : this.tempValue
            } else {
                const start = this._toDayjs(
                    this.range ? pathOr(null, 'start', this.value) : this.value
                )

                return start.isValid() && start
            }
        },

        _endDayjs() {
            if (this.hoverValue) {
                return this.hoverValue.isAfter(this.tempValue)
                    ? this.hoverValue
                    : this.tempValue
            } else {
                const end = this._toDayjs(pathOr(null, 'end', this.value))

                return end.isValid() && end
            }
        },

        _minDayjs() {
            const minDayjs = this._toDayjs(this.min)
            return minDayjs.isValid() && minDayjs
        },

        _maxDayjs() {
            const maxDayjs = this._toDayjs(this.max)
            return maxDayjs.isValid() && maxDayjs
        },

        _isDisabled() {
            const fns = [this.disabledDays]

            if (this._minDayjs) {
                fns.push(date =>
                    this._minDayjs.isAfter(this._toDayjs(date), 'days')
                )
            }

            if (this._maxDayjs) {
                fns.push(date =>
                    this._maxDayjs.isBefore(this._toDayjs(date), 'days')
                )
            }

            return anyPass(fns)
        },

        _isActive() {
            if (this.range) {
                const verifiers = []

                if (this._startDayjs) {
                    verifiers.push(date => {
                        return this._startDayjs.isSame(
                            this._toDayjs(date),
                            'day'
                        )
                    })
                }

                if (this._endDayjs) {
                    verifiers.push(date => {
                        return this._endDayjs.isSame(this._toDayjs(date), 'day')
                    })
                }

                return anyPass(verifiers)
            } else {
                return date => {
                    const _date = this._toDayjs(date)
                    return this._isMultiple
                        ? this._valueDayjs.some(val => val.isSame(_date))
                        : this._valueDayjs.isSame(_date, 'day')
                }
            }
        },

        _isRangeStart() {
            return date => {
                return (
                    this._startDayjs &&
                    this._startDayjs.isSame(this._toDayjs(date), 'day')
                )
            }
        },

        _isRangeEnd() {
            return date => {
                return (
                    this._endDayjs &&
                    this._endDayjs.isSame(this._toDayjs(date), 'day')
                )
            }
        },

        _inRange() {
            return date => {
                if (this._startDayjs && this._endDayjs) {
                    const dayjs = this._toDayjs(date)

                    return (
                        this._startDayjs.isBefore(dayjs, 'day') &&
                        this._endDayjs.isAfter(dayjs, 'day')
                    )
                } else {
                    return false
                }
            }
        },

        _getDayClass() {
            if (this.range) {
                return date => ({
                    'aw-calendar__day_active': this._isActive(date),
                    'aw-date__range': this._inRange(date),
                    'aw-date__range-start': this._isRangeStart(date),
                    'aw-date__range-end': this._isRangeEnd(date)
                })
            } else {
                return date => ({
                    'aw-calendar__day_active': this._isActive(date)
                })
            }
        },

        _stringFormat() {
            return this.parseFormat || this.outputFormat
        },

        _fromDayjs() {
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
        const date = this._toDayjs(
            this.range
                ? pathOr(null, 'start', this.value)
                : Array.isArray(this.value)
                ? this.value[0]
                : this.value
        )

        // validate date, or fallback to current
        if (date.isValid()) {
            this.viewDate = date
        } else {
            this.viewDate = this._toDayjs(new Date())
        }
    },

    beforeDestroy() {
        this._toggleHoverListener(false)
    },

    methods: {
        shiftMonth(offset = 0) {
            const method = offset > 0 ? 'add' : 'subtract'
            this.viewDate = this.viewDate[method](Math.abs(offset), 'month')
        },

        _toggleHoverListener(on = false) {
            this.$el[on ? 'addEventListener' : 'removeEventListener'](
                'mouseover',
                this.onHover
            )
        },

        _toDayjs(input) {
            if (this._stringFormat && typeof input === 'string') {
                return dayjs(input, this._stringFormat)
            }

            return dayjs(input)
        },

        _getDateFromEvent: getDateFromEvent,

        onDateClick($event) {
            const date = this._getDateFromEvent($event)

            // break if day is disabled
            if (!date || this._isDisabled(date)) return

            const dayjs = this._toDayjs(date)
            let value

            if (this.range) {
                // range value
                if (!this.tempValue) {
                    // set first value in range
                    this.$emit('input', null)
                    this.tempValue = dayjs
                    this.hoverValue = null
                    this._toggleHoverListener(true)
                    return
                } else {
                    // break if same day
                    if (dayjs.isSame(this.tempValue, 'day')) return

                    // emit event and close dropdown
                    const start = this._fromDayjs(this._startDayjs)
                    const end = this._fromDayjs(this._endDayjs)

                    this._toggleHoverListener(false)
                    this.tempValue = null
                    this.hoverValue = null

                    value = { start, end }
                }
            } else {
                // non-range value
                value = this._getNonRangeValue(dayjs)
            }

            /**
             * @vuese
             * Fire on active date click, returns picked date.
             * If an array is provided as value, adds/removes picked day from array.
             * @arg date in `outputFormat` or array of dates
             */
            this.$emit('input', value)
        },

        _getNonRangeValue(dayjs) {
            if (this._isMultiple) {
                const index = this._valueDayjs.findIndex(val =>
                    val.isSame(dayjs)
                )
                if (index === -1) {
                    return this._valueDayjs.concat(dayjs).map(this._fromDayjs)
                } else {
                    return this._valueDayjs
                        .filter((val, i) => i !== index)
                        .map(this._fromDayjs)
                }
            } else {
                return this._fromDayjs(dayjs)
            }
        },

        onHover($event) {
            const date = this._getDateFromEvent($event)
            const dayjs = this._toDayjs(date)

            if (dayjs.isValid()) {
                this.hoverValue = dayjs
            }
        }
    }
}
