<template>
    <div class="aw-calendar__nav">
        <AwButton
            v-show="$listeners['click:prev']"
            theme="icon"
            icon="chevron-l"
            :disabled="disabledPrev"
            @click.stop="$emit('click:prev')"
        />
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
            {{ months[month] }} {{ year }}
        </div>
        <AwButton
            v-show="$listeners['click:next']"
            theme="icon"
            icon="chevron-r"
            :disabled="disabledNext"
            @click.stop="$emit('click:next')"
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
