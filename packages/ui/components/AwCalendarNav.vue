<template>
    <div class="calendar__nav">
        <AwButton
            theme="icon"
            icon="chevron-l"
            :disabled="disabledPrev"
            @click="$emit('click:prev')"
        />
        <div class="calendar__nav-title">
            <!-- <AwButton theme="toggle" class="min-w-0 px-2">
                {{ months[month] }}
            </AwButton>
            <AwButton theme="toggle" class="min-w-0 px-2">
                {{ year }}
            </AwButton> -->
            {{ months[month] }} {{ year }}
        </div>
        <AwButton
            theme="icon"
            icon="chevron-r"
            :disabled="disabledNext"
            @click="$emit('click:next')"
        />
    </div>
</template>

<script>
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
    }
}
</script>
