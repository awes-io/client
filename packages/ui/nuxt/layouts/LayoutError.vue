<template>
    <div class="bg-muted flex flex-col h-screen min-h-screen">
        <header class="bg-brand pt-6 pb-48">
            <div class="container text-2xl font-semibold">
                <span v-html="$t('AwLayoutDefault.caption')"></span>
            </div>
        </header>

        <main class="container flex-grow flex items-stretch">
            <div
                class="bg-surface px-4 py-8 -mt-40 flex flex-col justify-center items-center w-full shadow rounded"
            >
                <h1 class="text-center text-3xl">
                    {{ $t('AwLayoutError.subtitle') }}
                </h1>
                <div class="text-center text-6xl">{{ statusCode }}</div>
                <p class="text-center text-disabled">
                    {{ message }}
                </p>
            </div>
        </main>

        <footer
            class="container text-center text-disabled py-4"
            v-html="$t('AwLayoutDefault.footer')"
        ></footer>
    </div>
</template>

<script>
import { isType } from 'rambdax'

export default {
    name: 'error',

    layout: 'empty',

    head() {
        if (isType('Function', this.$nuxtI18nSeo)) {
            return this.$nuxtI18nSeo()
        }
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
        }
    }
}
</script>
