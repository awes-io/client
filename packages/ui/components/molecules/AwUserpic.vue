<template>
    <span class="flex items-center">
        <LazyAwAvatar
            :size="hideName || bigImage ? 36 : 22"
            :src="src"
            :name="name"
            :is-colored="isColored"
            :type="getType"
        />
        <span
            v-if="!hideName"
            class="ml-2 flex flex-col"
            :class="{ 'text-sm': !!description }"
        >
            {{ name }}
            <slot name="description">
                <span class="text-mono-400">{{ description }}</span>
            </slot>
        </span>
    </span>
</template>

<script>
export default {
    name: 'AwAvatar',

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

        // It's hide the user name. The size of the image will be bigger.
        hideName: {
            type: Boolean,
            default: false
        },

        // text under name
        description: {
            type: String,
            default: ''
        },

        // If true - the size of the image will be bigger
        bigImage: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        isColored() {
            return false /* !(
                this.src === '' &&
                (this.name === '' || this.name.replace(/ /g, '') === '')
            )*/
        },

        getType() {
            return !this.src && !this.hideName ? 'no-img' : 'initials'
        }
    }
}
</script>
