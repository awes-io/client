<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 4 }">
            <AwLink href="http://google.com/"> Google</AwLink>
        </AwGrid>

        <AwCodeSnippet v-text="code" class="mt-3" />
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwLink',
            headline: this._getTitle('AwLink'),
            code: '<AwLink href="http://google.com/"> Google</AwLink>'
        }
    },
    head() {
        return {
            title: this._getMetaTitle(this.title),
            meta: [this._getMetaDescription(this.title)]
        }
    }
}
</script>
