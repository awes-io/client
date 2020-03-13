<template>
    <AwPage title="Homepage" :breadcrumb="breadcrumb">
        <h1 class="text-center py-20">Awes.io UI</h1>
    </AwPage>
</template>

<script>
export default {
    name: 'Homepage',

    data() {
        return {
            breadcrumb: {
                title: 'Back',
                href: '/modals'
            }
        }
    }
}
</script>
