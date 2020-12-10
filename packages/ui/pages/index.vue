<template>
    <AwPageUser
        title="Homepage"
        :breadcrumb="breadcrumb"
        src="//placehold.it/300"
        url="//httpbin.org/post"
    >
        <h1 class="text-center py-20">Awes.io UI</h1>
    </AwPageUser>
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
