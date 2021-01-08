<template>
    <AwPageUser
        :src="user.avatar"
        :title="userName || $t('AwesIoProfile.title')"
        :subnav="subnav"
        url="/api/profile/avatar"
        @saved="$auth.fetchUser()"
        @removed="$auth.fetchUser()"
    >
        <template #subtitle>
            <span v-if="userDescription" class="text-mono-400">
                {{ userDescription }}
            </span>
        </template>

        <NuxtChild :user="user" />
    </AwPageUser>
</template>

<script>
import { pathOr } from 'rambdax'
import { mapState } from 'vuex'

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
        },

        userDescription() {
            return pathOr('', 'profile.position', this.user)
        }
    }
}
</script>
