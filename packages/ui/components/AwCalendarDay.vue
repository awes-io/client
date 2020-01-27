<template functional>
    <button
        type="button"
        :data-index="props.index"
        class="calendar__day"
        :class="{
            calendar__day_outside: props.isOutside,
            calendar__day_disabled: props.isDisabled,
            calendar__day_active: props.isActive
        }"
    >
        <span> {{ props.day }} </span>
    </button>
</template>

<script>
export default {
    name: 'AwCalendarDay',

    props: {
        day: {
            type: Number,
            required: true
        },

        index: {
            type: Number,
            required: true
        },

        isOutside: Boolean,

        isDisabled: Boolean,

        isActive: Boolean
    }
}
</script>
