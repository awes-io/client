<template functional>
    <button
        :data-time="props.timestamp"
        :disabled="data.attrs.disabled || null"
        :class="[data.staticClass, data.class]"
        type="button"
        tabindex="-1"
        class="aw-calendar__day"
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

        timestamp: {
            type: Number,
            required: true
        }
    }
}
</script>
