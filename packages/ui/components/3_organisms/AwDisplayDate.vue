<template>
    <span>{{ formattedDate }}</span>
</template>

<script>
import birthdayMixin from '@AwMixins/birthday'

export default {
    name: 'AwDisplayDate',

    mixins: [birthdayMixin],

    props: {
        // Date to parse. String or dayjs object
        date: {
            type: [String, Object],
            required: true
        },

        // Format to display if year is present. Without age.
        // Full list of supported formats - https://day.js.org/docs/en/display/format#list-of-localized-formats
        fullDisplayFormat: {
            type: String,
            default: 'LL'
        },
        // Format to display if year is not present. Without age.
        shortDisplayFormat: {
            type: String,
            default: 'MMMM D'
        },

        // If true - hide age in brackets
        showAge: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        formattedDate() {
            if (!this.date) {
                return ''
            }

            let age = null
            const now = this.dayjs()
            const date = this.toDayjs(this.date)

            const isYearPresent = this.getYearString(this.date).includes(
                date.year()
            )
            const format = isYearPresent
                ? this.fullDisplayFormat
                : this.shortDisplayFormat

            const str = date.format(format)

            if (this.showAge && isYearPresent) {
                age = now.diff(date, 'year')
            }

            return age
                ? `${str} (${age} ${this.$t('AwBirthdayDate.years')})`
                : str
        }
    }
}
</script>
