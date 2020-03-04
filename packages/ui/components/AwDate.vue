<template>
    <div class="relative">
        <AwInput
            v-bind="{ ...$attrs, label, id }"
            :value="inputValue"
            readonly
            @focus="isOpened = true"
            @click="isOpened = true"
        />
        <AwDropdown :show.sync="isOpened" class="max-h-unset max-w-full">
            <AwCalendar
                class="max-w-xs"
                v-bind="calendarProps"
                :value="isVModel ? value : calendarValue"
                @input="onInput"
            />
        </AwDropdown>
    </div>
</template>

<script>
import { pick, keys } from 'rambdax'
import dayjs from 'dayjs'
import fieldMixin from '../mixins/field'
import AwCalendar from './AwCalendar.vue'

const pickCalendarProps = pick(keys(AwCalendar.props))

export default {
    name: 'AwDate',

    mixins: [fieldMixin],

    props: {
        ...AwCalendar.props,

        format: {
            type: String,
            default() {
                return this.$t('AwDate.format')
            }
        }
    },

    data() {
        return {
            isOpened: false,
            calendarValue: this.value
        }
    },

    computed: {
        isVModel() {
            return !!this.$listeners.input
        },

        calendarProps() {
            return pickCalendarProps(this.$props)
        },

        inputValue() {
            const value = this.isVModel ? this.value : this.calendarValue

            return value ? dayjs(value).format(this.format) : ''
        }
    },

    methods: {
        onInput(date) {
            if (this.isVModel) {
                this.$emit('input', date)
            } else {
                this.calendarValue = date
            }
            this.isOpened = false
        }
    }
}
</script>
