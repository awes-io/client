<template>
    <aw-dashboard-builder v-bind="$props">
        <template #image>
            <slot name="image">
                <AwSvgImage name="checklist" class="mx-auto mb-8" />
            </slot>
        </template>

        <!-- TODO: Add chartjs donut chart -->
        <!-- <template #chart="chartData">
        </template> -->

        <template #footer>
            <slot name="footer"></slot>
        </template>
    </aw-dashboard-builder>
</template>

<script>
import AwDashboardBuilder from './AwDashboardBuilder.vue'
import dashboardMixin from '../mixins/dashboard'

export default {
    name: 'AwDashboardLine',

    mixins: [dashboardMixin],

    components: {
        AwDashboardBuilder
    }
}
</script>
