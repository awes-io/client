<template>
    <AwPage :title="$t('AwesIoNuxtAdmin.role')" :subnav="subnav">
        <NuxtChild :model="role" v-if="loaded" />
    </AwPage>
</template>

<script>
import Role from '../collections/Role'

export default {
    name: 'RoleUpdate',

    data() {
        return {
            role: new Role({ id: this.$route.params.id }),
            loaded: false
        }
    },
    
    computed: {
        subnav() {
            return [
                {
                    text: this.$t('AwesIoNuxtAdmin.information'),
                    href: this.localePath({ path: '/admin/roles/' + this.$route.params.id })
                },
                {
                    text: this.$t('AwesIoNuxtAdmin.permissions_title'),
                    href: this.localePath({ path: '/admin/roles/' + this.$route.params.id + '/permissions' })
                }
            ]
        }
    },

    async mounted() {
        await this.role.fetch()
        this.loaded = true
    },
}
</script>
