<template>
    <div class="relative bg-muted overflow-hidden mt-auto">
        <ul ref="list" class="rounded dashboard__legend">
            <li
                v-for="(item, index) in data"
                :key="item.color"
                :class="{ 'mt-4': index }"
                class="flex items-center font-body text-xs"
            >
                <span
                    v-if="!hideDot"
                    class="w-2 h-2 mr-2 rounded-full flex-none"
                    :style="{ backgroundColor: item.color }"
                />

                <span class="truncate">
                    {{ item.title }}
                </span>

                <div class="ml-auto flex items-center text-grey font-bold">
                    {{ _getItemValue(item) }}

                    <span
                        v-if="isPercentShown"
                        :class="[
                            !item.value_diff ? 'invisible' : '',
                            item.value_diff && item.value_diff > 0
                                ? 'text-success'
                                : 'text-error'
                        ]"
                        class="dashboard__legend_difference"
                    >
                        {{ _getDiffValue(item) }}%

                        <AwIcon
                            :name="item.value_diff > 0 ? 'arrow-u' : 'arrow-d'"
                            :class="
                                item.value_diff > 0
                                    ? 'text-success'
                                    : 'text-error'
                            "
                        />
                    </span>
                </div>
            </li>
        </ul>

        <span
            :style="topShadowStyle"
            class="dashboard__legend_shadow dashboard__legend_shadow_top"
        ></span>
        <span
            :style="bottomShadowStyle"
            class="dashboard__legend_shadow dashboard__legend_shadow_bottom"
        ></span>
    </div>
</template>

<script>
export default {
    name: 'AwDashboardLegend',

    props: {
        data: {
            type: Array,
            required: true
        },

        percent: {
            type: Boolean,
            default: false
        },

        template: {
            type: String,
            default: '{value}'
        },

        hideDot: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            scrollTop: 0,
            clientHeight: 0,
            scrollHeight: 0,
            isShadow: false
        }
    },

    computed: {
        isPercentShown() {
            return this.data.some(el => el.value_diff)
        },

        topShadowStyle() {
            return {
                opacity: this.isShadow && this.scrollTop > 0 ? '1' : '0'
            }
        },

        bottomShadowStyle() {
            const isBot =
                this.scrollHeight - this.scrollTop === this.clientHeight
            return {
                opacity: this.isShadow && !isBot ? '1' : '0'
            }
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.isShadow =
                this.$refs.list.scrollHeight > this.$refs.list.clientHeight
            this._toggleScrollListener(true)
            this._onScroll()
        })
    },

    beforeDestroy() {
        this._toggleScrollListener(false)
    },

    methods: {
        _getItemValue(item) {
            if (!item.value && item.value !== 0) return ''
            const val = this.percent ? Math.round(item.percent) : item.value
            return this.template.replace('{value}', val)
        },

        _getDiffValue(item) {
            if (!item.value_diff) return ''
            const prevVal = item.value + item.value_diff
            const diff =
                (Math.abs(item.value - prevVal) /
                    ((prevVal + item.value) / 2)) *
                100
            return Math.round(diff)
        },

        _onScroll() {
            this.scrollTop = this.$refs.list.scrollTop
            this.scrollHeight = this.$refs.list.scrollHeight
            this.clientHeight = this.$refs.list.clientHeight
        },

        _toggleScrollListener(on = false) {
            this.$refs.list[on ? 'addEventListener' : 'removeEventListener'](
                'scroll',
                this._onScroll
            )
        }
    }
}
</script>
