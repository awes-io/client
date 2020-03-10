<template>
    <AwPage :title="user.full_name" :breadcrumb="breadcrumb" >
        <NuxtChild :model="user" v-if="loaded" />
    </AwPage>
</template>

<script>
import User from '../collections/User'

export default {
    name: 'UserUpdate',

    data() {
        return {
            user: new User({ id: this.$route.params.id }),
            loaded: false,
            breadcrumb: {
                title: this.$t('AwesIoNuxtAdmin.employees'),
                href: '/admin/users'
            }
        }
    },

    async mounted() {
        await this.user.fetch()
        this.loaded = true
    },
}
</script>
