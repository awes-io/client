<template>
    <AwPage title="AwTabNav">
        <h2>Router links</h2>
        <AwTabNav :items="routes" />

        <h2>Buttons</h2>
        <AwTabNav
            :items="[
                { text: 'One', badge: { text: 1, color: 'success' } },
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
                    text: 'Without order',
                    href: { query: { orderBy: null, limit: 50, order: null } },
                    badge: { text: 'default', color: 'info' }
                },
                {
                    text: 'Order by name',
                    href: {
                        query: { orderBy: 'name', order: 'ASC', limit: null }
                    }
                },
                {
                    text: 'Order by id',
                    href: { query: { orderBy: 'id', order: 'ASC', limit: 5 } }
                },
                {
                    text: 'Order by name',
                    href: {
                        query: { orderBy: 'name', order: 'DESC', limit: null }
                    }
                },
                {
                    text: 'Order by id',
                    href: { query: { orderBy: 'id', order: 'DESC', limit: 5 } }
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
