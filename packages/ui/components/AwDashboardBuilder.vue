<template>
    <AwCard
        :class="{
            [$options._config.baseClass]: true,
            'is-wide': _isWide,
            'counter-hidden': hideCounter
        }"
        ref="card"
    >
        <div :class="_cssClasses.header">
            <div class="mb-5">
                <div :class="_cssClasses.title">
                    {{ title }}
                </div>

                <div :class="_cssClasses.subtitle">
                    {{ subtitle }}
                </div>
            </div>

            <div :class="$options._config.filter">
                <slot name="filter"></slot>
            </div>
        </div>

        <div v-if="isMounted" class="flex h-full">
            <div class="min-w-0 flex-auto left-col flex flex-col">
                <div
                    :class="[
                        _cssClasses.content,
                        contentInline ? 'is-inline' : ''
                    ]"
                >
                    <div v-if="!hideCounter">
                        <div :class="_cssClasses.counter">
                            <slot name="counter">
                                {{ data.total }}
                                <AwIconSystem
                                    v-if="data.total_diff"
                                    name="arrow"
                                    :rotate="_isArrowPositive ? 90 : -90"
                                    :class="
                                        _isArrowPositive
                                            ? 'text-success'
                                            : 'text-error'
                                    "
                                />
                            </slot>
                        </div>

                        <div
                            v-if="description"
                            :class="_cssClasses.description"
                        >
                            {{ description }}
                        </div>
                    </div>

                    <div v-if="!_isWide">
                        <slot name="chart" v-bind:data="chartData"></slot>
                    </div>
                </div>

                <div v-if="!hideLegend" class="px-4 mb-4 mt-auto">
                    <AwDashboardLegend
                        :template="template"
                        :data="legendData"
                        :percent="percent"
                        :hide-dot="hideDot"
                    />
                </div>
            </div>

            <div v-if="_isWide" :class="_cssClasses.chart">
                <slot name="image"></slot>
                <div class="w-full">
                    <slot name="chart" v-bind:data="chartData"></slot>
                </div>
            </div>
        </div>

        <slot name="footer"></slot>
    </AwCard>
</template>

<script>
import { getBemClasses } from '../assets/js/css'
import AwDashboardLegend from './AwDashboardLegend.vue'
import dashboardMixin from '../mixins/dashboard'

export default {
    name: 'AwDashboardBuilder',

    mixins: [dashboardMixin],

    components: {
        AwDashboardLegend
    },

    props: {
        contentInline: {
            type: Boolean,
            default: false
        },

        hideCounter: {
            type: Boolean,
            default: false
        },

        hideDot: {
            type: Boolean,
            default: false
        },

        hideLegend: {
            type: Boolean,
            default: false
        },

        noWideState: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            isMounted: false,
            isWide: false,
            timeout: null
        }
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
                    'counter',
                    'filter',
                    'content',
                    'chart',
                    'subtitle'
                ])
            }
        },

        _isWide() {
            return this.isWide && !this.noWideState
        },

        legendData() {
            return this.data.elements.map((el, index) => {
                return {
                    ...el,
                    percent: (el.value * 100) / this.data.total,
                    color: this._mergedColors[index]
                }
            })
        },

        chartData() {
            return this.legendData.filter((el) => el.on_chart)
        },

        template() {
            if (this.data.template) return this.data.template
            return this.percent ? '{value}%' : '{value}'
        }
    },

    watch: {
        isWide(val) {
            this.$emit('width-change', val)
        }
    },

    mounted() {
        this.toggleResizeListener(true)
        this.checkIfWide()
        this.isMounted = true
    },

    beforeDestroy() {
        clearTimeout(this.timeout)
        this.toggleResizeListener(false)
    },

    methods: {
        toggleResizeListener(on = false) {
            window[on ? 'addEventListener' : 'removeEventListener'](
                'resize',
                this.onResize
            )
        },

        checkIfWide() {
            this.isWide = this.$refs.card.$el.clientWidth > 543
        },

        onResize() {
            clearTimeout(this.timeout)
            this.timeout = setTimeout(this.checkIfWide, 300)
        }
    }
}
</script>
