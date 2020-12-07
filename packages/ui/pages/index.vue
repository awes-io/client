<template>
    <AwPageUser
        title="Homepage"
        :breadcrumb="breadcrumb"
        @remove="log"
        @save="log"
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
    },

    methods: {
        log(val) {
            alert(val)
        }
    }
}
</script>
