<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 4 }">
            <AwSwitcher label="Active" />
        </AwGrid>

        <AwCodeSnippet v-text="code" class="mt-3" />
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwSwitcher',
            headline: this._getTitle('AwSwitcher'),
            code: '<AwSwitcher label="Active" />'
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
