<template>
    <aw-dashboard-builder v-bind="$props" :is-counter-visible="false">
        <!-- TODO: Add chartjs donut chart -->
        <template #chart="chartData">
            <div style="max-width: 300px" class="mx-auto relative mt-4 mb-8">
                <AwChart
                    type="doughnut"
                    :data="formatData(chartData)"
                    :height="height"
                    :options="chartOptions"
                />

                <div class="dashboard__counter-wrapper">
                    <div class="dashboard__counter">
                        340
                        <div class="dashboard__description">
                            {{ description }}
                        </div>
                    </div>
                </div>
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
    name: 'AwDashboardDoughnut',

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
            chartOptions: {
                cutoutPercentage: 67,
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
