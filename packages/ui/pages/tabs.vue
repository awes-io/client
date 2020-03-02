<template>
    <AwPage title="AwTabNav">
        <h2>Router links</h2>
        <AwTabNav :items="routes" />

        <h2>Buttons</h2>
        <AwButtonNav
            :items="[
                { text: 'One', badge: { text: 1, color: 'success' } },
                'Two',
                'Three',
                { text: 'Four', disabled: true },
                { text: 'Five', disabled: false },
                'Six',
                'Seven',
                'Eight',
                'Nine',
                'Ten'
            ]"
            :active.sync="active"
        />
        <hr />
        <AwButtonNav
            :items="[
                'All',
                'New',
                'In progress',
                'Accepted',
                'Rejected',
                'Finished'
            ]"
            :active.sync="status"
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
                    text: 'With badge',
                    href: {},
                    badge: { text: 'default', color: 'info' }
                },
                {
                    text: 'Without order',
                    href: { query: { limit: 50 } }
                },
                {
                    text: 'Order by name',
                    href: { query: { orderBy: 'name' } }
                },
                {
                    text: 'Order by id',
                    href: { query: { orderBy: 'id_DESC', limit: 5 } }
                },
                {
                    text: 'Order by name',
                    href: { query: { orderBy: 'name_DESC' } }
                },
                {
                    text: 'Order by id',
                    href: { query: { orderBy: 'id', order: 'DESC', limit: 5 } }
                }
            ],
            active: [6],
            status: 2
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
