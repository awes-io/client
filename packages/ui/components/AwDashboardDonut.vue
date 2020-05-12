<template>
    <aw-dashboard-builder
        v-bind="$props"
        hide-counter
        ref="builder"
        class="donut"
        @width-change="isWide = $event"
    >
        <template #chart="chartData">
            <div class="chart-wrapper">
                <div class="dashboard__counter-wrapper">
                    <div class="dashboard__counter text-3xl">
                        {{ data.total }}
                        <div class="dashboard__description">
                            {{ description }}
                        </div>
                    </div>
                </div>

                <AwChart
                    type="doughnut"
                    :data="formatData(chartData)"
                    :height="height"
                    :options="chartOptions"
                />
            </div>
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
    name: 'AwDashboardDonut',

    mixins: [dashboardMixin],

    components: {
        AwDashboardBuilder
    },

    props: {
        height: {
            type: Number,
            default: 200
        }
    },

    data() {
        return {
            isWide: false,
            chartOptions: {
                cutoutPercentage: 67,
                tooltips: {
                    enabled: false
                },
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
                        backgroundColor: obj.colors,
                        weight: 5
                    }
                ]
            }
        }
    }
}
</script>
