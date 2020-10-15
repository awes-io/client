<template>
    <div
        class="flex flex-col justify-center items-center"
        :class="{
            'bg-muted flex-grow': isNotFound,
            'h-full': !isNotFound
        }"
    >
        <h1 class="text-center text-3xl">
            {{ $t('AwLayoutError.subtitle') }}
        </h1>
        <div class="text-center text-6xl">{{ statusCode }}</div>
        <p class="text-center text-disabled">
            {{ message }}
        </p>
    </div>
</template>

<script>
import layoutMixin from './layout-mixin'

export default {
    name: 'error',

    layout({ app }) {
        return app.nuxt.err && app.nuxt.err.statusCode === 404
            ? 'default'
            : 'LayoutFrameScreen'
    },

    mixins: [layoutMixin],

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
