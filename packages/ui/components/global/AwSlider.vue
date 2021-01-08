<template>
    <Component
        :is="tag"
        class="aw-slider"
        @mousedown.capture="_activate"
        @dragstart.capture="_prevent"
    >
        <span
            ref="scroller"
            class="aw-slider__scroller"
            :class="{ 'aw-slider__scroller--mouse-move': movedByMouse }"
            @scroll="_setScroll"
        >
            <slot />
        </span>
        <span
            aria-hidden="true"
            class="aw-slider__shadow aw-slider__shadow_left"
            :style="shadowLeftStyle"
        ></span>
        <span
            aria-hidden="true"
            class="aw-slider__shadow aw-slider__shadow_right"
            :style="shadowRightStyle"
        ></span>
    </Component>
</template>

<script>
import { pick, pathOr } from 'rambdax'

const CLICK_THRESHOLD_T = 300 // ms
const CLICK_THRESHOLD_X = 5 // px

export default {
    name: 'AwSlider',

    props: {
        tag: {
            type: String,
            default: 'div'
        }
    },

    data() {
        return {
            $event: null,
            movedByMouse: false,
            scrollStart: 0,
            scrollLeft: 0,
            scrollWidth: 0,
            width: 0
        }
    },

    computed: {
        maxScrollLeft() {
            const diff = this.scrollWidth - this.width
            return diff > 1 ? diff : 0 // +1 for browser's rounding inconsistancy
        },

        shadowLeftStyle() {
            return {
                opacity: this.scrollLeft <= 0 ? '0' : '1' // handle overscroll with <=
            }
        },

        shadowRightStyle() {
            return {
                opacity: this.scrollLeft >= this.maxScrollLeft - 2 ? '0' : '1' // handle oerscroll with >=
            }
        }
    },

    watch: {
        movedByMouse: '_toggle',

        scrollLeft(val) {
            if (!this.movedByMouse) return
            this.$refs.scroller.scrollLeft = val
        }
    },

    mounted() {
        window.addEventListener('resize', this._onResize)
        this.$nextTick(() => {
            this._setDimensions()
        })
    },

    beforeDestroy() {
        this._toggle(false)
        clearTimeout(this._resizetm)
        window.removeEventListener('resize', this._onResize)
        this.$el.removeEventListener('click', this._prevent, true)
    },

    methods: {
        _toggle(isActive) {
            const method = isActive ? 'addEventListener' : 'removeEventListener'

            window[method]('mousemove', this._move)
            window[method]('mousemove', this._checkDragging)
            window[method]('mouseup', this._deactivate)
        },

        _activate($event) {
            if (this.movedByMouse) return

            this._setDimensions()
            this.scrollStart = this.scrollLeft

            // set start position
            this.$event = pick('type,timeStamp,pageX', $event)
            this.$event.pageX = pathOr($event.pageX, 'touches.0.pageX', $event)

            this.movedByMouse = true
        },

        _deactivate() {
            this.movedByMouse = false
            this.$nextTick(() => {
                // set closest position
                this.$refs.scroller.scrollLeft = this.scrollLeft

                // remove click prevention listener
                setTimeout(() => {
                    this.$el.removeEventListener('click', this._prevent, true)
                }, 10)
            })
        },

        _move($event) {
            // calculate new position
            const end = pathOr($event.pageX, 'touches.0.pageX', $event)
            const diff = this.$event.pageX - end
            this.scrollLeft = this._withBorders(this.scrollStart + diff)
        },

        /**
         * listener, that calculates threshold
         * to detect if it is a drag event, and not a click
         */
        _checkDragging($event) {
            const { pageX, timeStamp } = $event
            const time = timeStamp - this.$event.timeStamp
            const x = this.$event.pageX - pageX
            if (time > CLICK_THRESHOLD_T || x > CLICK_THRESHOLD_X) {
                this.$el.addEventListener('click', this._prevent, true)
                const moveEvent = this._isTouch ? 'touchmove' : 'mousemove'
                window.removeEventListener(moveEvent, this._checkDragging)
            }
        },

        _setScroll(e) {
            this.scrollLeft = e.target.scrollLeft
        },

        _setDimensions() {
            const el = this.$refs.scroller

            if (!el) return

            this.width = el.offsetWidth

            this.scrollWidth = Array.from(el.children).reduce(
                (acc, _el) => acc + this._getFullWidth(_el),
                0
            )
        },

        _withBorders(scrollLeft) {
            if (scrollLeft > this.maxScrollLeft) {
                return this.maxScrollLeft
            }
            if (scrollLeft < 0) {
                return 0
            }
            return scrollLeft
        },

        scrollTo(el) {
            try {
                const els = this.$refs.scroller.childNodes
                let scrollLeft = 0

                for (let i = 0, length = els.length; i < length; i++) {
                    if (el === els[i]) {
                        this.scrollLeft = this._withBorders(scrollLeft)
                        this.$refs.scroller.scrollLeft = this.scrollLeft
                        break
                    } else {
                        scrollLeft = scrollLeft + this._getFullWidth(els[i])
                    }
                }
            } catch (e) {
                console.log(e)
            }
        },

        _getFullWidth(el) {
            const elWidth = el.scrollWidth

            const style = el.currentStyle || getComputedStyle(el)

            const margin =
                parseFloat(style.marginLeft) + parseFloat(style.marginRight)

            const border =
                parseFloat(style.borderLeftWidth) +
                parseFloat(style.borderRightWidth)

            return elWidth + margin + border
        },

        _onResize() {
            clearTimeout(this._resizetm)
            this._resizetm = setTimeout(() => {
                this._setDimensions()
                this.scrollLeft = this._withBorders(this.scrollLeft)
                this.$refs.scroller.scrollLeft = this.scrollLeft
                this.$emit('resized')
            }, 300)
        },

        _prevent($event) {
            $event.preventDefault()
            $event.stopImmediatePropagation()
            $event.stopPropagation()
            return false
        }
    }
}
</script>
