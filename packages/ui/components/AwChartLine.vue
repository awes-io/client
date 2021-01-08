<template functional>
    <div
        class="flex bg-mono-300 rounded-full overflow-hidden aw-chart"
        :style="`height: ${props.height}px`"
    >
        <div
            v-for="(line, index) in props.data"
            v-tooltip="`${line.title}: ${line.value}`"
            :key="line.color"
            :class="{
                'border-r-2': index !== props.data.length - 1
            }"
            :style="$options._getStyles(line)"
            class="border-surface"
        ></div>
    </div>
</template>

<script>
export default {
    name: 'AwChartLine',

    props: {
        data: {
            type: Array,
            required: true
        },

        height: {
            type: [Number, String],
            default: 7
        }
    },

    _getStyles(line) {
        return {
            width: `${line.percent}%`,
            backgroundColor: line.color,
            transition: 'width .3s ease'
        }
    }
}
</script>
