<template>
    <div class="chart">
        <canvas :height="`${height}px`" ref="canvas"></canvas>
    </div>
</template>
<script>
import { equals } from 'rambdax'
import loadjs from 'loadjs'

const CHART_ID = 'chart'

export default {
    name: 'AwChart',

    props: {
        data: {
            type: Object,
            required: true
        },

        show: {
            type: Boolean,
            default: true
        },

        options: Object,

        type: {
            type: String,
            default: 'line'
        },

        height: {
            type: Number,
            default: 150
        }
    },

    data() {
        return {
            chart: null,
            tooltip: false,
            libUrl:
                'https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js'
        }
    },

    watch: {
        show(isShown) {
            if (!this.chart) return
            this.chart[isShown ? 'update' : 'reset']()
            this.chart.render()
        },

        data(newData, oldData) {
            if (!equals(newData, oldData)) {
                if (this.chart) {
                    this.chart.data = newData
                    this.chart.update()
                } else {
                    this.generateChart()
                }
            }
        },

        type(newType, oldType) {
            if (newType !== oldType) {
                this.destroyChart()
                this.generateChart()
            }
        }
    },

    methods: {
        generateChart() {
            if (this.data && !this.data.datasets) {
                throw new Error('Charts: datasets expected in data prop')
            } else {
                this.chart = new window.Chart(
                    this.$refs.canvas.getContext('2d'),
                    {
                        type: this.type,
                        data: this.data,
                        options: this.options
                    }
                )
            }
        },

        destroyChart() {
            if (this.chart) this.chart.destroy()
        },

        init() {
            return loadjs.isDefined(CHART_ID)
                ? new Promise((resolve, reject) =>
                      loadjs.ready(CHART_ID, {
                          success: resolve,
                          error: reject
                      })
                  )
                : loadjs([this.libUrl], CHART_ID, {
                      returnPromise: true
                  })
        },

        isInited() {
            return loadjs.isDefined(CHART_ID)
        }
    },

    async mounted() {
        await this.$nextTick()
        if (!('Chart' in window)) {
            await this.init()
        }
        this.generateChart()
    },

    beforeDestroy() {
        this.destroyChart()
    }
}
</script>
