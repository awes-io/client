<template>
    <AwPage title="AwTabNav">
        <h2>Router links</h2>
        <AwTabNav :items="routes" />

        <h2>Buttons</h2>
        <AwTabNav :items="['One', 'Two', 'Three']" :active.sync="active" />
    </AwPage>
</template>

<script>
export default {
    name: 'TabsPage',

    head() {
        return {
            title: 'AwTabNav'
        }
    },

    data() {
        return {
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
    }
}
</script>
