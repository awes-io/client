<template>
    <AwPage :title="role.name" :subnav="subnav" :breadcrumb="breadcrumb" >
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
            loaded: false,
            breadcrumb: {
                title: this.$t('AwesIoNuxtAdmin.roles'),
                href: '/admin/roles'
            }
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
