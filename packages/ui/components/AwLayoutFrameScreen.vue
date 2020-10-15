<template>
    <div class="bg-muted flex flex-col h-screen min-h-screen">
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
            class="container text-center text-disabled text-sm py-4"
            v-html="$t('AwLayoutDefault.footer')"
        ></footer>
    </div>
</template>

<script>
export default {
    name: 'AwLayoutFrameScreen'
}
</script>
