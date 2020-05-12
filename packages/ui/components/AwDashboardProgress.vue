<template>
    <aw-dashboard-builder
        v-bind="$props"
        :hide-counter="!isWide && hideCounter"
        ref="builder"
        class="dashboard__has-chart"
        @width-change="isWide = $event"
    >
        <template #chart>
            <div class="chart-wrapper">
                <div class="image">
                    <slot name="image">
                        <AwSvgImage name="checklist" />
                    </slot>
                </div>

                <div
                    v-show="isWide || !hidePercent"
                    :class="{ 'is-bottom': isWide }"
                    class="dashboard__counter-wrapper"
                >
                    <div class="dashboard__counter text-base">
                        {{ _totalPercent }}%
                    </div>
                </div>

                <aw-chart-progress :percent="_totalPercent" />
            </div>
        </template>

        <template #footer>
            <slot name="footer"></slot>
        </template>
    </aw-dashboard-builder>
</template>

<script>
import AwChartProgress from './AwChartProgress.vue'
import AwDashboardBuilder from './AwDashboardBuilder.vue'
import dashboardMixin from '../mixins/dashboard'

export default {
    name: 'AwDashboardProgress',

    mixins: [dashboardMixin],

    components: {
        AwDashboardBuilder,
        AwChartProgress
    },

    props: {
        // If true - hide counter and description on small version
        hideCounter: {
            type: Boolean,
            default: false
        },

        // If true - hide percent value on chart on small version
        hidePercent: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            isWide: false
        }
    },

    computed: {
        _totalPercent() {
            const sum = this.data.elements.reduce(
                (acc, val) => acc + parseInt(val.value),
                0
            )
            return Math.round((sum * 100) / this.data.total)
        }
    }
}
</script>
