<template>
    <div class="flex items-center">
        <AwButton
            theme="icon"
            icon="arrow-l"
            :disabled="disabledPrev"
            @click="$emit('click:prev')"
        />
        <div class="flex-grow text-center">
            <!-- <AwButton theme="toggle" class="min-w-0 px-2">
                {{ months[month] }}
            </AwButton>
            <AwButton theme="toggle" class="min-w-0 px-2">
                {{ year }}
            </AwButton> -->
            <span class="text-sm opacity-50">
                {{ months[month] }} {{ year }}
            </span>
        </div>
        <AwButton
            theme="icon"
            icon="arrow-r"
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
