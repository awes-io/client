<template>
    <aw-dashboard-builder v-bind="$props">
        <template #image>
            <slot name="image">
                <AwSvgImage name="checklist" class="mx-auto mb-8" />
            </slot>
        </template>

        <template #chart="chartData">
            <AwChartLine :data="chartData.data" />
        </template>

        <template #footer>
            <slot name="footer"></slot>
        </template>
    </aw-dashboard-builder>
</template>

<script>
import AwDashboardBuilder from './AwDashboardBuilder.vue'
import AwChartLine from './AwChartLine.vue'
import dashboardMixin from '../mixins/dashboard'

export default {
    name: 'AwDashboardLine',

    mixins: [dashboardMixin],

    components: {
        AwChartLine,
        AwDashboardBuilder
    }
}
</script>
