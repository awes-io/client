<template>
    <aw-dashboard-builder
        v-bind="$props"
        hide-counter
        hide-dot
        ref="builder"
        class="dashboard__has-chart dashboard-speed"
        @screen-change="isWide = $event"
    >
        <template #chart>
            <div class="chart-wrapper">
                <div
                    :class="{ 'is-bottom': isWide }"
                    class="dashboard__counter-wrapper"
                >
                    <div class="dashboard__counter text-base">
                        <!-- {{ _totalPercent }}% -->
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
        _arrowValue() {
            const arrowVal = this.data.elements.filter(el => el.on_chart)
            return Math.round((arrowVal[0].value / this.data.total) * 100)
        },

        _sections() {
            return this.sections.map(el => {
                el.value = Math.round((el.value / this.data.total) * 100)
                return el
            })
        }
    }
}
</script>
