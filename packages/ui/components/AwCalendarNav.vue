<template>
    <div class="aw-calendar__nav">
        <AwButton
            v-show="$listeners['click:prev']"
            theme="icon"
            :disabled="disabledPrev"
            @click.stop="$emit('click:prev')"
        >
            <AwIconSystem name="angle" />
        </AwButton>
        <div
            class="aw-calendar__nav-title"
            :class="{
                'mr-12': !$listeners['click:next'],
                'ml-12': !$listeners['click:prev']
            }"
        >
            <!-- <AwButton theme="toggle" class="min-w-0 px-2">
                {{ months[month] }}
            </AwButton>
            <AwButton theme="toggle" class="min-w-0 px-2">
                {{ year }}
            </AwButton> -->
            {{ _months[month] }} {{ year }}
        </div>
        <AwButton
            v-show="$listeners['click:next']"
            theme="icon"
            :disabled="disabledNext"
            @click.stop="$emit('click:next')"
        >
            <AwIconSystem name="angle" rotate="180" />
        </AwButton>
    </div>
</template>

<script>
import { AwCalendar as lang } from '../lang/en.js'

export default {
    name: 'AwCalendarNav',

    props: {
        year: {
            type: Number
        },

        month: {
            type: Number
        },

        months: {
            type: Array,
            default() {
                return this.$t('AwCalendar.months')
            }
        },

        disabledPrev: Boolean,

        disabledNext: Boolean
    },

    computed: {
        _months() {
            return Array.isArray(this.months) ? this.months : lang.months
        }
    }
}
</script>
