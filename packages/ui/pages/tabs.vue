<template>
    <AwPage title="AwTabNav">
        <h2>Router links</h2>
        <AwTabNav :items="routes" />

        <h2>Buttons</h2>
        <AwTabNav
            :items="[
                'One',
                'Two',
                'Three',
                'Four',
                'Five',
                'Six',
                'Seven',
                'Eight',
                'Nine',
                'Ten'
            ]"
            :active.sync="active"
        />
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
                {
                    text: 'Order default',
                    href: { query: { orderBy: null, limit: 50 } }
                },
                {
                    text: 'Order by name',
                    href: { query: { orderBy: 'name', limit: null } }
                },
                {
                    text: 'Order by id',
                    href: { query: { orderBy: 'id', limit: 5 } }
                }
            ],
            active: 6
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
