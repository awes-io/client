<script>
import AwCalendarDay from './AwCalendarDay.vue'

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
export function getCalendarDates(year, month, firstDay) {
    const result = []

    let day = new Date(year, month)

    day.setDate(1 - day.getDay() + firstDay)

    // Modify first day if not correct
    if (firstDay && day.getDate() === firstDay + 1) {
        day.setDate(firstDay - 6)
    }

    // 6 weeks always displayed to keep size
    for (let i = 0; i < 6 * 7; ++i) {
        const date = new Date(day)
        result.push(date)
        day.setDate(day.getDate() + 1)
    }

    return result
}

export default {
    name: 'AwCalendarDays',

    functional: true,

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

        dayClass: {
            type: Function,
            default: () => null
        },

        dayDisabled: {
            type: Function,
            default: () => null
        },

        showToday: {
            type: Boolean,
            default: false
        }
    },

    render(h, { props }) {
        const {
            year,
            month,
            firstDay,
            dayDisabled,
            dayClass,
            showToday
        } = props

        const dates = getCalendarDates(year, month, firstDay)

        return dates.map(date => {
            const classes = {}
            const timestamp = date.setHours(0, 0, 0, 0)
            if (showToday) {
                const today = new Date().setHours(0, 0, 0, 0)
                classes['aw-calendar__day_today'] = timestamp === today
            }

            return h(AwCalendarDay, {
                key: timestamp,
                props: {
                    timestamp,
                    day: date.getDate()
                },
                class: [
                    { 'aw-calendar__day_outside': date.getMonth() !== month },
                    { ...classes },
                    dayClass(date)
                ],
                attrs: {
                    disabled: dayDisabled(date)
                }
            })
        })
    }
}
</script>
