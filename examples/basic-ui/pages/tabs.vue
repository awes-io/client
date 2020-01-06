<template>
    <AwPage :title="headline">
        <h2>Router links</h2>
        <AwTabNav :items="routes" />

        <h2>Buttons</h2>
        <AwTabNav :items="['One', 'Two', 'Three']" :active.sync="active" />
    </AwPage>
</template>

<script>
export default {
    name: 'TabsPage',

    data() {
        return {
            title: 'AwTabNav',
            headline: this._getTitle('AwTabNav'),
            routes: [
                { text: 'Order default', href: { query: { orderBy: null } } },
                { text: 'Order by name', href: { query: { orderBy: 'name' } } },
                { text: 'Order by id', href: { query: { orderBy: 'id' } } }
            ],
            active: 2
        }
    },

    methods: {
        isActive(items) {
            return items.findIndex(
                ({ href }) => href.query.orderBy == this.$route.query.orderBy
            )
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
