<template>
    <Component
        :is="tag"
        class="aw-slider"
        @mousedown.capture="_activate"
        @touchstart.capture="_activate"
        @dragstart.capture="_prevent"
        @focus.capture="_onFocus"
        @scroll="_prevent"
    >
        <span ref="scroller" class="aw-slider__scroller">
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
            active: false,
            scrollStart: 0,
            scrollLeft: 0,
            scrollWidth: 0,
            width: 0
        }
    },

    computed: {
        _isTouch() {
            return pathOr('', 'type', this.$event) === 'touchstart'
        },

        maxScrollLeft() {
            const diff = this.scrollWidth - this.width
            return diff > 1 ? diff : 0 // +1 for browser's rounding inconsistancy
        },

        scrollStyle() {
            return {
                transform: `translateX(-${this.scrollLeft}px)`,
                transition: this.active ? 'none' : null
            }
        },

        shadowLeftStyle() {
            return {
                opacity: this.scrollLeft === 0 ? '0' : '1'
            }
        },

        shadowRightStyle() {
            return {
                opacity: this.scrollLeft === this.maxScrollLeft ? '0' : '1'
            }
        }
    },

    watch: {
        active: '_toggle',

        scrollLeft(val) {
            this.$refs.scroller.scrollLeft = val
        }
    },

    mounted() {
        window.addEventListener('resize', this._onResize)
        this.$refs.scroller.addEventListener('scroll', this._delayedSnap)
        this.$nextTick(() => {
            this._setDimensions()
        })
    },

    beforeDestroy() {
        this._toggle(false)
        clearTimeout(this._snaptm)
        clearTimeout(this._resizetm)
        this.$refs.scroller.removeEventListener('scroll', this._delayedSnap)
        window.removeEventListener('resize', this._onResize)
        this.$el.removeEventListener('click', this._prevent, true)
    },

    methods: {
        _toggle(isActive) {
            const method = isActive ? 'addEventListener' : 'removeEventListener'
            const invertMethod = isActive
                ? 'removeEventListener'
                : 'addEventListener'

            const moveEvent = this._isTouch ? 'touchmove' : 'mousemove'
            const endEvent = this._isTouch ? 'touchend' : 'mouseup'
            const cancelEvent = this._isTouch ? 'touchcancel' : 'mouseleave'

            this.$refs.scroller[invertMethod]('scroll', this._delayedSnap)

            window[method](moveEvent, this._move)
            window[method](moveEvent, this._checkDragging)
            window[method](endEvent, this._deactivate)
            window[method](cancelEvent, this._deactivate)
        },

        _activate($event) {
            if (this.active) return

            this._setDimensions()
            this.scrollStart = this.scrollLeft

            // set start position
            this.$event = pick('type,timeStamp,pageX', $event)
            this.$event.pageX = pathOr($event.pageX, 'touches.0.pageX', $event)

            this.active = true
        },

        _deactivate() {
            this.active = false
            this.$nextTick(() => {
                // set closest position
                this._snap()

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

        _delayedSnap($event) {
            clearTimeout(this._snaptm)

            this._snaptm = setTimeout(() => {
                this.scrollLeft = this._withBorders($event.target.scrollLeft)
                this._snap()
            }, 60)
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

        /**
         * Scrolls to closest child to fit
         */
        _snap() {
            const els = this.$refs.scroller.childNodes
            const left = this.scrollLeft
            const right = this.width + this.scrollLeft
            let _width = 0
            let bestFitLeft = Infinity
            let bestFitRight = Infinity

            for (let i = 0, length = els.length; i < length; i++) {
                let elWidth = this._getFullWidth(els[i])
                let offsetLeft = _width - left
                let offsetRight = right - _width - elWidth

                if (Math.abs(offsetLeft) < Math.abs(bestFitLeft)) {
                    bestFitLeft = offsetLeft
                }

                if (Math.abs(offsetRight) < Math.abs(bestFitRight)) {
                    bestFitRight = offsetRight
                }

                _width += elWidth
            }

            if (Math.abs(bestFitLeft) < Math.abs(bestFitRight)) {
                this.scrollLeft = this._withBorders(
                    this.scrollLeft + bestFitLeft
                )
            } else {
                this.scrollLeft = this._withBorders(
                    this.scrollLeft - bestFitRight
                )
            }
        },

        _setDimensions() {
            const el = this.$refs.scroller

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
                this.$emit('resized')
            }, 300)
        },

        _onFocus($event) {
            const el = $event.target
            const bounds = el.getBoundingClientRect()
            const wrapBounds = this.$el.getBoundingClientRect()

            if (
                wrapBounds.left > bounds.left ||
                wrapBounds.right < bounds.right
            ) {
                this._prevent($event)
                this.scrollTo(el)
            }
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
