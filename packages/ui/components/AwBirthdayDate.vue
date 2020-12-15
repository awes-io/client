<template>
    <span>{{ formattedDate }}</span>
</template>

<script>
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)

export default {
    name: 'AwBirthdayDate',

    props: {
        // Date to parse. String or dayjs object
        date: {
            type: [String, Object],
            required: true
        },

        // For dayjs to parse string
        parseFormat: {
            type: String,
            default: null
        },

        // Format to display without age.
        // Full list of supported formats - https://day.js.org/docs/en/display/format#list-of-localized-formats
        displayFormat: {
            type: String,
            default: 'LL'
        },

        // If true - hide age in brackets
        hideAge: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        formattedDate() {
            if (!this.date) {
                return ''
            }

            const _dayjs = this.$dayjs || dayjs

            const now = dayjs()
            const d =
                this.parseFormat && typeof this.date === 'string'
                    ? _dayjs(this.date, this.parseFormat)
                    : _dayjs(this.date)
            const str = d.format(this.displayFormat)
            const age = now.diff(d, 'year')

            return this.hideAge
                ? str
                : `${str} (${age} ${this.$t('AwBirthdayDate.years')})`
        }
    }
}
</script>
