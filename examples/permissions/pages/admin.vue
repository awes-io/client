<template>
    <AwPage title="Admin page">
        <h2>You are admin if you see this page</h2>
        <pre>{{ $store.state.auth.user }}</pre>
    </AwPage>
</template>

<script>
export default {
    name: 'AdminPage',

    middleware({ store, error }) {
        if (!store.getters.can('view', 'Settings')) {
            return error({ statusCode: 401, message: 'Permission denied' })
        }
    }
}
</script>
