<template>
    <aw-dashboard-builder v-bind="$props">
        <!-- TODO: Add chartjs donut chart -->
        <template #chart="chartData">
            <AwChart
                type="doughnut"
                :data="formatData(chartData)"
                :height="height"
                :options="chartOptions"
            />
        </template>

        <template #footer>
            <slot name="footer"></slot>
        </template>
    </aw-dashboard-builder>
</template>

<script>
import AwDashboardBuilder from './AwDashboardBuilder.vue'
import dashboardMixin from '../mixins/dashboard'

export default {
    name: 'AwDashboardLine',

    mixins: [dashboardMixin],

    components: {
        AwDashboardBuilder
    },

    props: {
        height: {
            type: Number,
            default: 75
        }
    },

    data() {
        return {
            chartOptions: {
                legend: {
                    display: false
                }
            }
        }
    },

    methods: {
        formatData(data) {
            const obj = data.data.reduce(
                (acc, val) => {
                    acc.colors.push(val.color)
                    acc.data.push(val.value)
                    acc.labels.push(val.title)
                    return acc
                },
                {
                    colors: [],
                    data: [],
                    labels: []
                }
            )

            return {
                labels: obj.labels,
                datasets: [
                    {
                        data: obj.data,
                        backgroundColor: obj.colors
                    }
                ]
            }
        }
    }
}
</script>
