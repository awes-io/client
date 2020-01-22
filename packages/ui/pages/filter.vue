<template>
    <AwPage title="AwButtonNav">
        <AwButtonNav :items="filters" />
    </AwPage>
</template>

<script>
export default {
    name: 'FilterPage',

    head() {
        return {
            title: 'AwButtonNav'
        }
    },

    data() {
        return {
            filters: [
                { text: 'Order default', href: { query: { orderBy: null } } },
                { text: 'Order by name', href: { query: { orderBy: 'name' } } },
                { text: 'Order by id', href: { query: { orderBy: 'id' } } },
                { text: 'Order by id1', href: { query: { orderBy: 'id1' } } },
                { text: 'Order by id2', href: { query: { orderBy: 'id2' } } },
                { text: 'Order by id3', href: { query: { orderBy: 'id3' } } },
                { text: 'Order by id4', href: { query: { orderBy: 'id4' } } },
                { text: 'Order by id5', href: { query: { orderBy: 'id5' } } },
                { text: 'Without href', disabled: true }
            ]
        }
    }
}
</script>
