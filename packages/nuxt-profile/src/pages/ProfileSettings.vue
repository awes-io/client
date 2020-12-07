<template>
    <AwForm url="/api/profile/update">
        <AwGrid>
            <AwInput
                v-model="userData.name"
                name="name"
                :label="$t('AwesIoAuth.fullName')"
                autocomplete="name"
            />
            <AwInput
                v-model="userData.email"
                name="email"
                type="email"
                :label="$t('AwesIoAuth.email')"
                autocomplete="email"
            />
            <AwButton
                type="submit"
                :text="$t('AwesIoProfile.update')"
                :disabled="isEqualData"
            />
        </AwGrid>
    </AwForm>

    <!-- resend email -->
    <!-- <AwButton @click="resendEmail" text="Resend email" /> -->
</template>

<script>
import { equals, pick } from 'rambdax'

export default {
    name: 'ProfileSettings',

    props: {
        user: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            userData: {
                name: '',
                email: ''
            }
        }
    },

    computed: {
        pickedUserdata() {
            return pick(Object.keys(this.userData), this.user)
        },

        isEqualData() {
            return equals(this.pickedUserdata, this.userData)
        }
    },

    created() {
        // copy fields
        // eslint-disable-next-line no-unused-vars
        for (let field in this.userData) {
            this.userData[field] = this.user[field]
        }
    },

    methods: {
        resendEmail() {
            this.$axios.get('/api/email/resend')
        }
    }
}
</script>
