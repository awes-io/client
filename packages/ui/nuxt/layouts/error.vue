<template>
    <div
        class="flex flex-col justify-center items-center"
        :class="{
            'bg-mono-400 flex-grow': isNotFound,
            'h-full': !isNotFound
        }"
    >
        <h1 class="text-center text-3xl">
            {{ $t('AwLayoutError.subtitle') }}
        </h1>
        <div class="text-center text-6xl">{{ statusCode }}</div>
        <p class="text-center text-mono-400">
            {{ message }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'error',

    layout({ app }) {
        return app.nuxt.err && app.nuxt.err.statusCode === 404
            ? 'default'
            : 'LayoutFrameScreen'
    },

    props: {
        error: {
            type: Object,
            default: null
        }
    },

    computed: {
        statusCode() {
            return (this.error && this.error.statusCode) || 500
        },

        message() {
            return this.error.message || this.$t('AwLayoutError.message')
        },

        isNotFound() {
            return this.statusCode === 404
        }
    }
}
</script>
