<template>
    <aw-dashboard-builder
        v-bind="$props"
        hide-legend
        no-wide-state
        ref="builder"
        class="dashboard-section"
    >
        <template #chart="chartData">
            <div class="chart-wrapper">
                <AwChart
                    type="line"
                    :data="formatData(chartData)"
                    :height="170"
                    :options="chartOptions"
                />
            </div>
        </template>
    </aw-dashboard-builder>
</template>

<script>
import AwDashboardBuilder from './AwDashboardBuilder.vue'
import dashboardMixin from '../mixins/dashboard'

export default {
    name: 'AwDashboardSection',

    mixins: [dashboardMixin],

    components: {
        AwDashboardBuilder
    },

    props: {
        // fill color if present
        backgroundColor: String,

        // Color of line
        borderColor: String,

        // If enabled shows bottom legend
        showAxisLegend: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            chartOptions: null
        }
    },

    computed: {
        _baseStyleOptions() {
            return {
                borderColor: this.borderColor || this._mergedColors[0],
                backgroundColor: this.backgroundColor || 'transparent',
                pointRadius: 2,
                pointHoverRadius: 5,
                fill: 'start'
            }
        }
    },

    created() {
        this.chartOptions = this._prepareConfig()
    },

    methods: {
        _prepareConfig() {
            return {
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                display: this.showAxisLegend,
                                suggestedMin: -1,
                                padding: -20,
                                callback: (value, index, values) => {
                                    return index && index + 1 !== values.length
                                        ? value
                                        : null
                                }
                            },
                            gridLines: {
                                borderDash: [2, 2],
                                drawTicks: false,
                                zeroLineWidth: 0
                            }
                        }
                    ],
                    yAxes: [
                        {
                            display: false,
                            ticks: {
                                suggestedMin: -1
                            }
                        }
                    ]
                }
            }
        },

        formatData(data) {
            const obj = data.data.reduce(
                (acc, val) => {
                    acc.data.push(val.value)
                    acc.labels.push(val.title)
                    return acc
                },
                {
                    data: [],
                    labels: []
                }
            )

            return {
                labels: obj.labels,
                datasets: [
                    {
                        data: obj.data,
                        ...this._baseStyleOptions
                    }
                ]
            }
        }
    }
}
</script>
