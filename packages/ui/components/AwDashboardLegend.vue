<template functional>
    <ul class="rounded bg-muted p-4 dashboard__legend">
        <li
            v-for="(item, index) in props.data"
            :key="item.color"
            :class="{ 'mt-4': index }"
            class="flex items-center font-body"
        >
            <span
                class="w-2 h-2 mr-2 rounded-full flex-none"
                :style="{ backgroundColor: item.color }"
            ></span>

            <span class="truncate">
                {{ item.title }}
            </span>

            <div class="ml-auto flex items-center">
                {{ $options._getItemValue(item, props.percent) }}

                <span
                    v-if="item.value_diff"
                    :class="
                        item.value_diff && item.value_diff > 0
                            ? 'text-success'
                            : 'text-error'
                    "
                    class="dashboard__legend_difference"
                >
                    {{ $options._getDiffValue(item) }}%

                    <AwIcon
                        :name="item.value_diff > 0 ? 'arrow-u' : 'arrow-d'"
                        :class="
                            item.value_diff > 0 ? 'text-success' : 'text-error'
                        "
                        class="ml-1"
                    />
                </span>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'AwDashboardLegend',

    props: {
        data: {
            type: Array,
            required: true
        },

        percent: {
            type: Boolean,
            default: false
        }
    },

    _getItemValue(item, percent) {
        const val = percent ? Math.round(item.percent) : item.value
        if (item.template) {
            return item.template.replace('{value}', val)
        }
        return val
    },

    _getDiffValue(item) {
        const prevVal = item.value + item.value_diff
        const diff =
            (Math.abs(item.value - prevVal) / ((prevVal + item.value) / 2)) *
            100
        return Math.round(diff)
    }
}
</script>
