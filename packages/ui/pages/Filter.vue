<template>
    <main>
        <AwButtonNav :items="filters" />
    </main>
</template>

<script>
export default {
    name: 'FilterPage',

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
