<template>
    <AwButton
        :href="_config.export"
        text="Lang File [.zip]"
        target="_blank"
        download
    />
</template>

<script>
export default {
    name: 'AwTranslationDownload'
}
</script>
