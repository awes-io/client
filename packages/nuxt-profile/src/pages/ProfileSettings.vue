<template>
    <div class="md:flex">
        <div class="flex-grow md:order-first md:pr-4">
            <AwForm url="/api/profile/update">
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
                    class="mt-2"
                    autocomplete="email"
                />
                <AwButton
                    type="submit"
                    :text="$t('AwesIoProfile.update')"
                    class="mt-4"
                    :disabled="isEqualData"
                />
            </AwForm>

            <!-- resend email -->
            <!-- <AwButton @click="resendEmail" text="Resend email" /> -->
        </div>

        <!-- avatar -->
        <div class="w-64 flex-shrink-0 max-w-full mt-4 md:mt-0">
            <div class="shadow-md relative">
                <img
                    v-if="user.avatar"
                    class="w-64 h-64"
                    :src="user.avatar"
                    :alt="`${userData.name} avatar`"
                />
                <div
                    v-else
                    class="flex items-center justify-center w-full h-64"
                >
                    <AwIcon
                        name="user"
                        class="opacity-50"
                        style="transform: scale(5)"
                    />
                </div>
                <div
                    class="flex flex-col justify-center items-center absolute inset-0 opacity-0 hover:opacity-100"
                >
                    <AwButton
                        :text="$t('AwesIoProfile.changeAvatar')"
                        @click="$root.$emit('modal::avatar:open')"
                    />
                    <AwButton
                        class="mt-4"
                        v-if="user.avatar"
                        :text="$t('AwesIoProfile.removeAvatar')"
                        @click="DELETE_AVATAR"
                    />
                </div>
            </div>
        </div>

        <!-- cropper modal -->
        <AwModal name="avatar" title="Upload avatar">
            <AwCropper
                src="/img/awes-io-avatar.jpg"
                @save="UPDATE_AVATAR"
                @cancel="$root.$emit('modal::avatar:close')"
            />
        </AwModal>
    </div>
</template>

<script>
import { equals, pick } from 'rambdax'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'ProfileSettings',

    data() {
        return {
            userData: {
                name: '',
                email: ''
            }
        }
    },

    computed: {
        ...mapState('auth', ['user']),

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
        ...mapActions('auth', ['UPDATE_AVATAR', 'DELETE_AVATAR']),

        resendEmail() {
            this.$axios.get('/api/email/resend')
        }
    }
}
</script>
