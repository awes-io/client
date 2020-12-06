<template functional>
    <span
        :style="[
            data.staticStyle,
            data.style,
            {
                'background-color': props.isColored
                    ? $options.getColor(props.name)
                    : '',
                width: props.size ? `${props.size}px` : null,
                height: props.size ? `${props.size}px` : null,
                'min-width': props.size ? `${props.size}px` : null,
                'min-height': props.size ? `${props.size}px` : null,
                'font-size': props.size ? `${(props.size / 100) * 3}rem` : null
            }
        ]"
        :class="[
            data.staticClass,
            data.class,
            props.isColored ? '' : 'bg-disabled'
        ]"
        class="inline-block align-middle rounded-full relative text-center text-surface"
    >
        <slot v-bind="{ ...props, initials: $options.getColor(props.name) }">
            <img
                v-if="$options.getSrc(props.src)"
                :height="props.size"
                :src="props.src"
                :alt="props.name || props.src"
                class="rounded-full min-h-full min-w-full"
            />
        </slot>
        <span
            v-if="!$options.getSrc(props.src) && props.type === 'initials'"
            class="absolute top-1/2 left-1/2 uppercase"
            style="transform: translate(-50%, -50%);"
            >{{ $options.getLetters(props.name) }}</span
        >
        <slot
            name="no-img"
            v-bind="{ ...props, initials: $options.getColor(props.name) }"
        >
            <AwIcon
                v-if="!$options.getSrc(props.src) && props.type === 'no-img'"
                size=""
                class="absolute text-surface top-1/2 left-1/2"
                style="transform: translate(-50%, -50%);"
                name="user-solid"
            />
        </slot>
    </span>
</template>

<script>
import { split, take, join, map, compose } from 'rambdax'
import AwIcon from './AwIcon.vue'

export default {
    name: 'AwAvatar',

    components: {
        AwIcon
    },

    props: {
        // Full URL to the picture
        src: {
            type: String,
            default: ''
        },
        // User name
        name: {
            type: String,
            default: ''
        },
        // Size of the image
        size: {
            type: [Number, String],
            default: 36,
            validator(val) {
                const isValid = !Number.isNaN(val * 1)
                if (process.env.NODE_ENV === 'development' && !isValid) {
                    console.error(
                        `Incorrect size. Only numbers or strings as numbers allowed. Given value - ${val}`
                    )
                }
                return isValid
            }
        },
        // Type of the rendered image.
        type: {
            type: String,
            // initials , empty, no-img
            default: 'initials',
            validator(value) {
                return ['initials', 'empty', 'no-img'].includes(value)
            }
        },
        // To bring the color to the rounded background.
        isColored: {
            type: Boolean,
            default: true
        }
    },

    // To get source of the image if exist
    getSrc(src) {
        return src
    },
    // Convert user name to 2 first letters
    getLetters: compose(join(''), map(take(1)), take(2), split(/[ -]/)),

    // Get randome color from the preset list
    getColor(name) {
        let hash = 0
        const colors = [
            '#E0AB61',
            '#E29D5D',
            '#E68262',
            '#E45284',
            '#DF54BD',
            '#DA61D9',
            '#BF55CF',
            '#AF57DB',
            '#9C55D3',
            '#834EE3',
            '#634EE3',
            '#594FCF',
            '#6086E3',
            '#66B9E4',
            '#66C3D1',
            '#66C7B9',
            '#5CBC98',
            '#9A6F66'
        ]
        if (!name.length) return colors[0]
        for (var i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash)
            hash = hash & hash
        }
        hash = ((hash % colors.length) + colors.length) % colors.length
        return colors[hash]
    }
}
</script>
