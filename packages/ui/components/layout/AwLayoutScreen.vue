<template>
    <div class="bg-mono-400 flex flex-col h-screen min-h-screen">
        <header class="bg-brand pt-6 pb-48">
            <div class="container text-2xl font-semibold">
                <span v-html="$t('AwLayoutDefault.caption')"></span>
            </div>
        </header>

        <main class="container flex-grow flex items-stretch">
            <div class="bg-surface px-4 py-8 -mt-40 w-full shadow rounded">
                <slot />
            </div>
        </main>

        <footer
            class="container text-center text-mono-400 text-sm py-4"
            v-html="$t('AwLayoutDefault.footer')"
        ></footer>

        <!-- offline frame -->
        <AwOfflineNotify />
    </div>
</template>

<script>
import AwOfflineNotify from '../AwOfflineNotify.vue'

export default {
    name: 'AwLayoutScreen',

    componetns: {
        AwOfflineNotify
    }
}
</script>
