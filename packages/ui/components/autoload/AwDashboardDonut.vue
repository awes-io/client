<template>
    <aw-dashboard-builder
        v-bind="$props"
        hide-counter
        ref="builder"
        class="dashboard-donut"
        @width-change="isWide = $event"
    >
        <template #chart>
            <div class="chart-wrapper">
                <div class="dashboard__counter-wrapper">
                    <div class="dashboard__counter text-3xl">
                        {{ data.total }}
                        <div class="dashboard__description">
                            {{ description }}
                        </div>
                    </div>
                </div>

                <AwChart :options="options" />
            </div>
        </template>

        <template #footer>
            <slot name="footer"></slot>
        </template>
    </aw-dashboard-builder>
</template>

<script>
import AwDashboardBuilder from '../AwDashboardBuilder.vue'
import dashboardMixin from '../../mixins/dashboard'

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
        },
        // apexcharts options
        chartOptions: {
            type: Object,
            default: () => ({})
        }
    },

    data() {
        return {
            isWide: false
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
                chart: {
                    type: 'donut'
                },
                colors: this._mergedColors,
                labels: this._formattedOptions.labels,
                series: this._formattedOptions.series,
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                ...this.chartOptions
            }
        }
    }
}
</script>
