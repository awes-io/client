<template functional>
    <img
        v-if="props.src"
        :class="[
            data.staticClass,
            data.class,
            props.rounded ? 'rounded-full' : ''
        ]"
        :style="[data.staticStyle, data.style]"
        :src="props.src"
        :alt="props.name"
    />
    <span class="text-2xl text-primary text-center" v-else>
        {{ $options.toCapitals(props.name) }}
    </span>
</template>

<script>
export default {
    name: 'AwAvatar',

    props: {
        src: {
            type: String,
            default: ''
        },

        name: {
            type: String,
            default: ''
        },

        rounded: {
            type: Boolean,
            default: true
        }
    },

    toCapitals(str) {
        return str
            .split(' ')
            .map(w => w.charAt(0))
            .join()
            .substr(0, 2)
    }
}
</script>
