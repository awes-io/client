<template>
    <AwPage :title="headline">
        <AwBadge text="8" color="info">
            Badge text
        </AwBadge>
    </AwPage>
</template>

<script>
export default {
    name: 'BadgePage',

    data() {
        return {
            title: 'AwBadge',
            headline: this._getTitle('AwBadge')
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
