<template>
    <aw-dashboard-builder
        v-bind="$props"
        hide-legend
        no-wide-state
        ref="builder"
        class="dashboard-section"
    >
        <template #chart>
            <div class="chart-wrapper">
                <AwChart v-if="isMounted" :options="options" />
            </div>
        </template>
    </aw-dashboard-builder>
</template>

<script>
import AwDashboardBuilder from '../AwDashboardBuilder.vue'
import dashboardMixin from '../../mixins/dashboard'

export default {
    name: 'AwDashboardSection',

    mixins: [dashboardMixin],

    components: {
        AwDashboardBuilder
    },

    props: {
        // Colors to fill area. By default - same as colors
        fillColors: {
            type: Array,
            default: () => []
        },
        // If true - hides x axis labels
        hideXLabels: {
            type: Boolean,
            default: false
        },
        // If true - hides y axis labels
        hideYLabels: {
            type: Boolean,
            default: false
        },
        // apexcharts options
        chartOptions: {
            type: Object,
            default: () => ({})
        }
    },

    data() {
        return {
            isMounted: false
        }
    },

    computed: {
        _formattedOptions() {
            const arr = this.data.elements.filter(el => el.on_chart)
            return arr.reduce(
                (acc, val) => {
                    acc.series.push(val.value)
                    acc.labels.push(val.title)
                    return acc
                },
                {
                    series: [],
                    labels: []
                }
            )
        },

        options() {
            return {
                series: [
                    {
                        name: this.title,
                        data: this._formattedOptions.series
                    }
                ],
                chart: {
                    type: 'area'
                },
                colors: this._mergedColors,
                fill: {
                    colors: [...this.fillColors, ...this._mergedColors]
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    categories: this._formattedOptions.labels,
                    labels: {
                        show: !this.hideXLabels
                    }
                },
                yaxis: {
                    labels: {
                        show: !this.hideYLabels
                    }
                },
                markers: { size: 5, hover: { size: 9 } },
                ...this.chartOptions
            }
        }
    },

    mounted() {
        // Need to wait if navbar is closed, or apexchart calculates wrong width
        setTimeout(() => {
            this.isMounted = true
        }, 250)
    }
}
</script>
