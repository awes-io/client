<template>
    <div class="relative">
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                v-for="(section, index) in _circlePaths"
                :key="index"
                :d="section.path"
                :stroke="section.color"
                fill="none"
                stroke-width="12"
            />
        </svg>

        <div class="speed-arrow">
            <div
                style="transition: transform 1s ease-out;"
                :style="`transform: rotate(${arrowAngle}deg)`"
            >
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="transform: translate(-2px, 5px)"
                >
                    <path
                        d="M93 47.5C93 47.5 51.5376 53 48.5 53C45.4624 53 43 50.5376 43 47.5C43 44.4624 45.4624 42 48.5 42C51.5376 42 93 47.5 93 47.5Z"
                        fill="#313336"
                    />
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
// Default angle in svg - 180deg
const START_ANGLE = -229.3
const MAX_ANGLE = 289

export default {
    name: 'AwChartSpeed',

    props: {
        arrowValue: {
            type: Number,
            required: true
        },

        sections: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            arrowAngle: START_ANGLE - 2,
            cx: 50,
            cy: 50,
            r: 43
        }
    },

    computed: {
        _arrowAngle() {
            return (MAX_ANGLE + 0.7) * (this.arrowValue / 100)
        },

        _circlePaths() {
            const fin = []
            this.sections.forEach((el, i) => {
                if (i === 0) {
                    const val = Math.ceil((MAX_ANGLE * el.value) / 100)
                    fin.push({
                        color: el.color,
                        value: el.value,
                        angle: START_ANGLE + val,
                        path: this._describeArc(START_ANGLE, START_ANGLE + val)
                    })
                } else {
                    const prev = fin[i - 1].value
                    const val = Math.ceil((MAX_ANGLE * (el.value - prev)) / 100)
                    const startAngle = fin[i - 1].angle
                    const endAngle = startAngle + val
                    fin.push({
                        color: el.color,
                        value: el.value,
                        angle: endAngle,
                        path: this._describeArc(startAngle, endAngle)
                    })
                }
            })
            return fin
        }
    },

    watch: {
        _arrowAngle() {
            this.arrowAngle = this._getArrowAngle()
        }
    },

    mounted() {
        setTimeout(() => {
            this.arrowAngle = this._getArrowAngle()
        }, 300)
    },

    methods: {
        _getArrowAngle() {
            return START_ANGLE - 2.1 + this._arrowAngle
        },

        _polarToCartesian(centerX, centerY, radius, angleInDegrees) {
            const angleInRadians = ((angleInDegrees - 5.5) * Math.PI) / 180.0

            return {
                x: centerX + radius * Math.cos(angleInRadians),
                y: centerY + radius * Math.sin(angleInRadians)
            }
        },

        _describeArc(startAngle, endAngle) {
            const start = this._polarToCartesian(
                this.cx,
                this.cy,
                this.r,
                endAngle
            )
            const end = this._polarToCartesian(
                this.cx,
                this.cy,
                this.r,
                startAngle
            )

            const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

            const d = [
                'M',
                start.x,
                start.y,
                'A',
                this.r,
                this.r,
                0,
                largeArcFlag,
                0,
                end.x,
                end.y
            ].join(' ')

            return d
        }
    }
}
</script>
