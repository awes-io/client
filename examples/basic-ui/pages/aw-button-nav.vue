<template>
    <AwPage :title="headline">
        <AwButtonNav :items="filters" />
    </AwPage>
</template>

<script>
export default {
    name: 'FilterPage',

    data() {
        return {
            title: 'AwButtonNav',
            headline: this._getTitle('AwButtonNav'),
            filters: [
                { text: 'Order default', href: { query: { orderBy: null } } },
                { text: 'Order by name', href: { query: { orderBy: 'name' } } },
                { text: 'Order by id', href: { query: { orderBy: 'id' } } }
            ]
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
