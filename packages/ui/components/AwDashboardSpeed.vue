<template>
    <aw-dashboard-builder
        v-bind="$props"
        hide-counter
        hide-dot
        ref="builder"
        class="dashboard__has-chart dashboard-speed"
        @width-change="isWide = $event"
    >
        <template #chart>
            <div class="chart-wrapper">
                <div class="dashboard__counter-wrapper is-bottom">
                    <div class="dashboard__counter text-base">
                        {{ _totalPercent }}%
                    </div>
                </div>

                <aw-chart-speed
                    :arrowValue="_arrowValue"
                    :sections="_sections"
                />
            </div>
        </template>

        <template #footer>
            <slot name="footer"></slot>
        </template>
    </aw-dashboard-builder>
</template>

<script>
import AwChartSpeed from './AwChartSpeed.vue'
import AwDashboardBuilder from './AwDashboardBuilder.vue'
import dashboardMixin from '../mixins/dashboard'

export default {
    name: 'AwDashboardSpeed',

    mixins: [dashboardMixin],

    components: {
        AwDashboardBuilder,
        AwChartSpeed
    },

    props: {
        sections: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            isWide: false
        }
    },

    computed: {
        _activeValue() {
            return this.data.elements.filter(el => el.on_chart)[0]
        },

        _arrowValue() {
            return Math.round((this._activeValue.value / this.data.total) * 100)
        },

        _totalPercent() {
            return Math.round((this._activeValue.value * 100) / this.data.total)
        },

        _sections() {
            const sections = JSON.parse(JSON.stringify(this.sections))
            return sections.map(el => {
                el.value = Math.round((el.value / this.data.total) * 100)
                return el
            })
        }
    }
}
</script>
