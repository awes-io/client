<template>
    <AwCard
        :class="[_cssClasses.base, `border-${color}`, { 'is-open': isOpen }]"
        @mouseleave.native="isOpen = false"
    >
        <div ref="content">
            <!-- Default slot -->
            <slot>
                <div :class="_cssClasses.title">{{ title }}</div>
                <div :class="_cssClasses.subtitle">{{ subtitle }}</div>
                <div :class="_cssClasses.number">{{ number }}</div>
                <div :class="_cssClasses.description">{{ description }}</div>
                <div :class="_cssClasses.footer">{{ footer }}</div>
            </slot>
        </div>

        <div
            v-if="!hideButton"
            :class="[_cssClasses.background, `bg-${color}`]"
            :style="isOpen ? `transform: scale(${bgScale})` : ''"
            @mouseenter="onMouseEnter"
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
            size="xs"
            @click="onButtonClick"
            @mouseenter="onMouseEnter"
            @mouseleave="cancelBgAnimation"
        >
            <AwIcon v-if="icon" :name="icon" />
            <svg
                v-else
                width="16"
                height="16"
                viewBox="0 0 12 12"
                class="fill-current"
            >
                <path
                    d="M11.88.36a.4.4 0 00-.32-.12L9.7.38a.4.4 0 10.06.81l.78-.05-2.74 2.74-3.2-2.7a.4.4 0 00-.55.02L.12 5.13a.4.4 0 00.58.57l3.66-3.65 3.18 2.7c.17.13.4.12.56-.03l3-3-.07.75a.4.4 0 00.81.07L12 .68a.4.4 0 00-.12-.32z"
                />
                <path
                    d="M3.64 5.04a.4.4 0 00-.44.09l-1.7 1.7a.4.4 0 00-.12.28v4.24c0 .23.18.41.4.41h1.7a.4.4 0 00.41-.4V5.41a.4.4 0 00-.25-.38zm-.56 5.9H2.2V7.28l.88-.88v4.54zM5.47 5.13a.4.4 0 00-.7.29v5.93c0 .23.19.41.41.41h1.7a.4.4 0 00.4-.4V7.1a.4.4 0 00-.11-.29l-1.7-1.7zm1 5.81h-.88V6.4l.88.88v3.66zM10.43 5.04a.4.4 0 00-.45.09l-1.7 1.7a.4.4 0 00-.12.28v4.24c0 .23.19.41.41.41h1.7a.4.4 0 00.4-.4V5.41a.4.4 0 00-.24-.38zm-.57 5.9h-.88V7.28l.88-.88v4.54z"
                />
            </svg>
        </AwButton>
    </AwCard>
</template>

<script>
import { getBemClasses } from '../../assets/js/css'

const DEBOUNCE = 350
let animationTimeout = null

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

        subtitle: String,

        number: String,

        description: String,

        footer: String,

        // Icon to diplay inside toggle button
        icon: {
            type: String,
            default: ''
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
            isAnimating: false,
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
                    'wrapper',
                    'subtitle'
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
            this.bgScale = Math.ceil((max + 18) / 20) * 3
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
        },

        onMouseEnter() {
            // wait for the end of animation
            this.blockAnimationClick(DEBOUNCE + 350)
            animationTimeout = setTimeout(() => {
                this.isOpen = true
            }, DEBOUNCE)
        },

        cancelBgAnimation() {
            clearTimeout(animationTimeout)
        },

        onButtonClick() {
            if (this.isAnimating) return
            this.isOpen = !this.isOpen
            this.blockAnimationClick()
        },

        blockAnimationClick(delay = 350) {
            this.isAnimating = true
            setTimeout(() => {
                this.isAnimating = false
            }, delay)
        }
    }
}
</script>
