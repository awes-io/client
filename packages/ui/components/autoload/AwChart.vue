<template>
    <div class="chart">
        <div ref="chart"></div>
    </div>
</template>
<script>
import { equals } from 'rambdax'
import loadjs from 'loadjs'

const CHART_ID = 'chart'

export default {
    name: 'AwChart',

    props: {
        // https://apexcharts.com/docs/
        options: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            chart: null,
            libUrl: ['https://cdn.jsdelivr.net/npm/apexcharts']
        }
    },

    watch: {
        options(newData, oldData) {
            if (!equals(newData, oldData) && this.chart) {
                this.chart.updateOptions(newData)
            }
        }
    },

    async mounted() {
        await this.$nextTick()
        await this.init()
        this.generateChart()
    },

    beforeDestroy() {
        this.destroyChart()
    },

    methods: {
        generateChart() {
            if (!this.options.series) {
                throw new Error('Charts: data series expected in series prop')
            } else {
                this.chart = new window.ApexCharts(
                    this.$refs.chart,
                    this.options
                )
                this.chart.render()
            }
        },

        init() {
            return loadjs.isDefined(CHART_ID)
                ? new Promise((resolve, reject) =>
                      loadjs.ready(CHART_ID, {
                          success: resolve,
                          error: reject
                      })
                  )
                : loadjs([...this.libUrl], CHART_ID, {
                      returnPromise: true
                  })
        },

        destroyChart() {
            if (this.chart) {
                this.chart.destroy()
            }
        }
    }
}
</script>
