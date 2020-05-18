<template>
    <AwCard
        :class="[_cssClasses.base, `border-${color}`, { 'is-open': isOpen }]"
    >
        <div ref="content">
            <!-- Default slot -->
            <slot>
                <h6 :class="_cssClasses.title">{{ title }}</h6>
                <h1 :class="_cssClasses.number">{{ number }}</h1>
                <p :class="_cssClasses.description">{{ description }}</p>

                <p :class="_cssClasses.footer">{{ footer }}</p>
            </slot>
        </div>

        <div
            v-if="!hideButton"
            :class="[_cssClasses.background, `bg-${color}`]"
            :style="isOpen ? `transform: scale(${bgScale})` : ''"
        />

        <transition name="fade-dashboard-card">
            <div v-show="isOpen" :class="_cssClasses.wrapper">
                <div :class="_cssClasses.content">
                    <!-- Slot for hidden content -->
                    <slot name="content"></slot>
                </div>
            </div>
        </transition>

        <AwButton
            v-if="!hideButton"
            :class="[_cssClasses.button, 'text-sm']"
            :color="isOpen ? '' : color"
            :content-class="
                'p-1 rounded-full ' + (isOpen ? `text-${color}` : '')
            "
            :icon="icon"
            size="xs"
            @click="isOpen = !isOpen"
        />
    </AwCard>
</template>

<script>
import { getBemClasses } from '../assets/js/css'

const DEBOUNCE = 250

export default {
    name: 'AwDashboardCard',

    _config: {
        baseClass: 'dashboard-card'
    },

    props: {
        // Color of left border and backgrond
        color: {
            type: String,
            default: 'info'
        },

        title: String,

        number: String,

        description: String,

        footer: String,

        // Icon to diplay inside toggle button
        icon: {
            type: String,
            default: 'graph-alt'
        },

        // if true hides toggle button for hidden content
        hideButton: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            isOpen: false,
            bgScale: 20,
            resizeTimeout: null
        }
    },

    computed: {
        _cssClasses() {
            const base = this.$options._config.baseClass
            return {
                base,
                ...getBemClasses(base, [
                    'title',
                    'number',
                    'description',
                    'footer',
                    'button',
                    'background',
                    'content',
                    'wrapper'
                ])
            }
        }
    },

    mounted() {
        if (!this.hideButton) {
            this.toggleResizeListener()
            this._getMaxSize()
        }
    },

    beforeDestroy() {
        this.toggleResizeListener(false)
    },

    methods: {
        _getMaxSize() {
            const width = this.$refs.content.offsetHeight
            const height = this.$refs.content.offsetWidth
            const max = width > height ? width : height
            // 20 - ibitial background size
            this.bgScale = Math.ceil((max + 18) / 20) * 2.5
        },

        toggleResizeListener(add = true) {
            window[add ? 'addEventListener' : 'removeEventListener'](
                'resize',
                this.resizeHandler
            )
        },

        resizeHandler() {
            clearTimeout(this.resizeTimeout)
            this.resizeTimeout = setTimeout(() => {
                this._getMaxSize()
            }, DEBOUNCE)
        }
    }
}
</script>
