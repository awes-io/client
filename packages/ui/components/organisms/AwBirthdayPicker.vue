<template>
    <AwInfo :label="label">
        <AwGrid :col="{ md: 12 }" :gap="5">
            <AwSelect
                v-model="month"
                :span="{ md: 5 }"
                :options="monthsList"
                :required="required"
                :name="_inputKeys.month"
                :label="$t('AwBirthdayPicker.month')"
                track-by="value"
                option-label="text"
                @input="checkMaxDay"
            />

            <AwSelect
                v-model="day"
                :span="{ md: 3 }"
                :options="daysList"
                :required="required"
                :name="_inputKeys.day"
                :label="$t('AwBirthdayPicker.day')"
                @input="emit"
            />

            <div class="flex items-center h-full" :span="{ md: 4 }">
                <AwLink
                    v-if="!_showYear"
                    :text="$t('AwBirthdayPicker.set_year')"
                    @click="isYearHidden = false"
                />

                <AwSelect
                    v-else
                    v-model="year"
                    :options="yearsList"
                    :required="required"
                    :name="_inputKeys.year"
                    :label="$t('AwBirthdayPicker.year')"
                    :clearable="!showYear"
                    class="w-full"
                    @input="checkMaxDay"
                    @clear="clearYear"
                />
            </div>
        </AwGrid>
    </AwInfo>
</template>

<script>
import birthdayMixin from '../../mixins/birthday.js'
import { isNil } from 'rambdax'

const DEFAULT_KEYS = {
    day: 'birthday_day',
    month: 'birthday_month',
    year: 'birthday_year'
}

export default {
    name: 'AwBirthdayPicker',

    mixins: [birthdayMixin],

    props: {
        value: {
            type: [String, Date, Number, Object],
            default: null
        },

        required: {
            type: Boolean,
            default: false
        },

        /**
         * If true show year select by default
         */
        showYear: {
            type: Boolean,
            default: false
        },

        /**
         * Inputs names for native form submission,
         * Accepted values: day, month, year.
         */
        inputNames: {
            type: Object,
            default: () => ({})
        },

        label: {
            type: String,
            default() {
                return this.$t('AwBirthdayPicker.birthday')
            }
        }
    },

    data() {
        return {
            month: null,
            day: null,
            year: null,
            isYearHidden: true
        }
    },

    computed: {
        _showYear() {
            return this.showYear || !this.isYearHidden
        },

        _inputKeys() {
            return {
                ...DEFAULT_KEYS,
                ...this.inputNames
            }
        },

        monthsList() {
            const date = this.dayjs()
            return [...Array(12).keys()].map(el => ({
                value: el,
                text: date.month(el).format('MMMM')
            }))
        },

        daysList() {
            const date = this.dayjs()

            if (this.year) {
                date.year(this.year)
            }

            const maxDays = this.dayjs()
                .month(this.month || 0)
                .daysInMonth()

            const arr = [...Array(maxDays + 1).keys()]
            arr.shift()
            return arr
        },

        yearsList() {
            const current = this.dayjs().year()
            return [...Array(101).keys()].map(el => current - el)
        }
    },

    watch: {
        value: {
            immediate: true,
            handler(val) {
                const date = this.parseDate(val)
                if (date) {
                    this.month = date.month
                    this.day = date.day
                    this.year = date.year
                    this.isYearHidden = !date.year
                }
            }
        }
    },

    methods: {
        checkMaxDay() {
            const maxDay = this.daysList[this.daysList.length - 1]
            this.day = this.day > maxDay ? maxDay : this.day
            this.emit()
        },

        // parseString(str) {
        //     if (!str) return

        //     const d = this.toDayjs(str)
        //     this.day = d.date()
        //     this.month = d.month()

        //     const y = d.year()
        //     const yString = this.getYearString(str)

        //     if (yString.includes(y)) {
        //         this.year = y
        //         this.isYearHidden = false
        //     }
        // },

        emit() {
            if (!isNil(this.month) && this.day) {
                let d = this.dayjs()
                    .month(this.month)
                    .date(this.day)
                let formatVal = this.shortParseFormat || 'MM-DD'

                if (!this.isYearHidden && this.year) {
                    d = d.year(this.year)
                    formatVal = this.fullParseFormat || null
                }

                this.$emit(
                    'input',
                    formatVal ? d.format(formatVal) : d.format()
                )
            }
        },

        clearYear() {
            this.isYearHidden = true
            this.year = null
            this.emit()
        }
    }
}
</script>
