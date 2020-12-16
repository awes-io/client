import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)

export default {
    props: {
        /**
         * Custom parse format for string dates with year,
         * for example `YYYY-MM-DD[T]HH:mm:sszz`.
         */
        fullParseFormat: {
            type: String,
            default: ''
        },

        /**
         * Custom parse format for string dates without year,
         * for example `MM-DD`.
         */
        shortParseFormat: {
            type: String,
            default: ''
        }
    },

    computed: {
        dayjs() {
            return this.$dayjs || dayjs
        }
    },

    methods: {
        toDayjs(input) {
            if (typeof input !== 'string') {
                return this.dayjs(input)
            }

            if (this.fullParseFormat) {
                const dLong = this.dayjs(input, this.fullParseFormat)
                if (dLong.isValid()) {
                    return dLong
                }
            }

            if (this.shortParseFormat) {
                const dShort = this.dayjs(input, this.shortParseFormat)
                if (dShort.isValid()) {
                    return dShort
                }
            }

            return this.dayjs(input)
        },

        parseDate(date) {
            if (!date) return null

            const d = this.toDayjs(date)
            const day = d.date()
            const month = d.month()
            let year = null

            const y = d.year()
            const yString = this.getYearString(date)

            if (yString.includes(y)) {
                year = y
            }

            return {
                day,
                month,
                year
            }
        },

        getYearString(date) {
            if (typeof date === 'string') return date
            return this.toDayjs(date).format()
        }
    }
}
