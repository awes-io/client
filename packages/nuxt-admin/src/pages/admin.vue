<template>
    <AwPage :title="title" :subnav="subnav">
        <NuxtChild />
    </AwPage>
</template>

<script>
import { pathOr } from 'rambdax'

export default {
    name: 'AdminPage',

    computed: {
        subnav() {
            return [
                {
                    text: this.$t('AwesIoNuxtAdmin.information'),
                    href: this.localePath({ path: '/admin/' })
                },
                {
                    text: this.$t('AwesIoNuxtAdmin.settings'),
                    href: this.localePath({ path: '/admin/settings' })
                }
            ]
        },

        currentSubnav() {
            return this.subnav.find(({ href }) => href === this.$route.path)
        },

        title() {
            return pathOr('Admin', 'text', this.currentSubnav)
        }
    }
}
</script>
