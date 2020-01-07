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
                { text: 'Order by id', href: { query: { orderBy: 'id' } } }
            ]
        }
    }
}
</script>
