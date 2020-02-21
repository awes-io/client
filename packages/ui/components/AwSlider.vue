<template>
    <Component
        :is="tag"
        :style="{
            'scroll-snap-type': active ? 'none' : null,
            'scroll-behavior': active ? 'auto' : null
        }"
        ref="wrap"
        class="aw-slider"
        @mousedown.capture="_activate"
        @dragstart.capture="_prevent"
    >
        <slot />
    </Component>
</template>

<script>
import { pick } from 'rambdax'

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
            event: {
                timeStamp: 0,
                pageX: 0
            },
            active: false,
            scrollLeft: 0
        }
    },

    watch: {
        active: '_toggle'
    },

    beforeDestroy() {
        this._toggle(false)
        this.$refs.wrap.removeEventListener('click', this._prevent, true)
    },

    methods: {
        _toggle(isActive) {
            const method = isActive ? 'addEventListener' : 'removeEventListener'
            window[method]('mousemove', this._move)
            window[method]('mousemove', this._checkDragging)
            window[method]('mouseup', this._deactivate)
            window[method]('mouseleave', this._deactivate)
        },

        _activate($event) {
            // set start position
            this.$event = pick('timeStamp,pageX', $event)
            this.scrollLeft = this.$refs.wrap.scrollLeft
            this.active = true
        },

        _deactivate() {
            const left = this.$refs.wrap.scrollLeft
            this.active = false
            this.$nextTick(() => {
                // set closest position
                this.$refs.wrap.scrollTo({ top: 0, left })

                // remove click prevention listener
                setTimeout(() => {
                    this.$refs.wrap.removeEventListener(
                        'click',
                        this._prevent,
                        true
                    )
                }, 10)
            })
        },

        _move($event) {
            // update scroll
            const diff = this.$event.pageX - $event.pageX
            this.$refs.wrap.scrollLeft = this.scrollLeft + diff
        },

        _checkDragging($event) {
            const { pageX, timeStamp } = $event
            const time = timeStamp - this.$event.timeStamp
            const x = this.$event.pageX - pageX
            if (time > CLICK_THRESHOLD_T || x > CLICK_THRESHOLD_X) {
                this.$refs.wrap.addEventListener('click', this._prevent, true)
                window.removeEventListener('mousemove', this._checkDragging)
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
