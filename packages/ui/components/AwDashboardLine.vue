<template>
    <AwCard :class="$options._config.baseClass" class="py-2">
        <div :class="_cssClasses.header">
            <span :class="_cssClasses.title">{{ title }}</span>
        </div>

        <div :class="_cssClasses.counter">
            {{ data.total }}
            <AwIcon
                :name="_isArrowPositive ? 'arrow-u' : 'arrow-d'"
                :class="_isArrowPositive ? 'text-success' : 'text-error'"
            />
        </div>

        <div v-show="description" :class="_cssClasses.description">
            {{ description }}
        </div>

        <div class="mt-4">
            <AwLineChart :data="_lineData" />
        </div>

        <div class="mt-5">
            <AwDashboardLegend :data="_legendData" percent />
        </div>

        <slot name="footer"></slot>
    </AwCard>
</template>

<script>
import { getBemClasses } from '../assets/js/css'
import AwLineChart from './AwLineChart.vue'
import AwDashboardLegend from './AwDashboardLegend.vue'
import dashboardMixin from '../mixins/dashboard'

export default {
    name: 'AwDashboardLine',

    mixins: [dashboardMixin],

    components: {
        AwLineChart,
        AwDashboardLegend
    },

    computed: {
        _cssClasses() {
            const base = this.$options._config.baseClass
            return {
                base,
                ...getBemClasses(base, [
                    'header',
                    'title',
                    'description',
                    'counter'
                ])
            }
        },

        _legendData() {
            return this.data.elements.map((el, index) => {
                return {
                    ...el,
                    percent: (el.value * 100) / this.data.total,
                    color: this._mergedColors[index],
                    template: '{value}%'
                }
            })
        },

        _lineData() {
            return this._legendData.filter(el => el.on_chart)
        }
    }
}
</script>
