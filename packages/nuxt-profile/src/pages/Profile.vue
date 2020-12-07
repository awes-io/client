<template>
    <AwPageUser
        :src="user.avatar"
        :title="userName || $t('AwesIoProfile.title')"
        :subnav="subnav"
        @save="UPDATE_AVATAR"
        @remove="DELETE_AVATAR"
    >
        <NuxtChild :user="user" />
    </AwPageUser>
</template>

<script>
import { pathOr } from 'rambdax'
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState('auth', ['user']),

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
        },

        userName() {
            const profile = pathOr({}, 'profile', this.user)

            return [profile.first_name, profile.last_name]
                .filter(Boolean)
                .join(' ')
        }
    },

    methods: {
        ...mapActions('auth', ['UPDATE_AVATAR', 'DELETE_AVATAR'])
    }
}
</script>
