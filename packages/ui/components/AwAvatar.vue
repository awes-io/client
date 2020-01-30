<template functional>
    <span
        :style="[
            data.staticStyle,
            data.style,
            {
                'background-color': props.color
                    ? $options.getColor(props.name)
                    : '',
                width: `${props.size}px`,
                height: `${props.size}px`
            }
        ]"
        :class="[
            data.staticClass,
            data.class,
            props.color ? '' : 'bg-disabled'
        ]"
        class="rounded-full relative text-center"
    >
        <slot v-bind="{ ...props, initials: $options.getColor(props.name) }">
            <img
                v-if="props.src"
                :height="props.size"
                :src="props.src"
                :alt="props.name"
                class="rounded-full"
            />
        </slot>
        <span
            v-if="!props.src && props.type === 'initials'"
            class="absolute text-surface top-1/2 left-1/2"
            style="transform: translate(-50%, -50%);"
            >{{ $options.toCapitals(props.name) }}</span
        >
        <slot
            name="no-img"
            v-bind="{ ...props, initials: $options.getColor(props.name) }"
        >
            <AwIcon
                v-if="!props.src && props.type === 'no-img'"
                class="absolute text-surface top-1/2 left-1/2"
                style="transform: translate(-50%, -50%);"
                name="close"
            />
        </slot>
    </span>
</template>

<script>
import colorHash from 'color-hash'
import AwIcon from './AwIcon.vue'

export default {
    name: 'AwAvatar',

    components: {
        AwIcon
    },

    props: {
        src: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        size: {
            type: Number,
            default: 36
        },

        type: {
            type: String,
            default: 'initials',
            validator(value) {
                return ['initials', 'empty', 'no-img'].includes(value)
            }
        },

        color: {
            type: Boolean
        }
    },

    toCapitals(str) {
        return str
            .split(' ')
            .map(w => w.charAt(0))
            .join()
            .substr(0, 3)
            .replace(',', '')
    },

    getColor(name) {
        const ColorHash = new colorHash()
        return ColorHash.hex(name)
    }
}
</script>
