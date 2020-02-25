<template>
    <AwPage :title="$t('AwesIoProfile.title')" :subnav="subnav">
        <NuxtChild />
    </AwPage>
</template>

<script>
export default {
    computed: {
        subnav() {
            return [
                {
                    text: this.$t('AwesIoProfile.profileTab'),
                    href: this.localePath({ path: '/profile' })
                },
                {
                    text: this.$t('AwesIoProfile.securityTab'),
                    href: this.localePath({ path: '/profile/security' })
                }
            ]
        }
    }
}
</script>
