<template>
    <AwPage :title="headline">
        <div class="md:flex" v-if="$route.path === '/profile'" key="root">
            <div class="flex-grow md:order-first">
                <AwForm url="/api/profile">
                    <AwInput v-model="userData.name" label="Name" />
                    <AwInput
                        v-model="userData.email"
                        label="Email"
                        class="mt-2"
                    />
                    <AwInput
                        v-model="userData.company"
                        label="Company"
                        class="mt-2"
                    />
                    <AwButton
                        type="submit"
                        text="Update"
                        class="mt-4"
                        :disabled="isEqualData"
                    />
                </AwForm>

                <!-- resend email -->
                <p class="my-4">Email not verified</p>
                <AwButton @click="resendEmail" text="Resend email" />
            </div>

            <!-- avatar -->
            <div class="max-w-xs md:pl-4">
                <div class="shadow-md relative">
                    <img src="//placehold.it/250" alt="img" />
                    <div
                        class="flex justify-center items-center absolute inset-0 opacity-0 hover:opacity-100"
                    >
                        <AwButton
                            text="Change"
                            @click="$root.$emit('modal::avatar:open')"
                        />
                    </div>
                </div>
            </div>

            <!-- cropper modal -->
            <AwModal name="avatar" title="Upload avatar">
                <AwCropper
                    src="//placehold.it/250"
                    @save="uploadAvatar"
                    @cancel="$root.$emit('modal::avatar:close')"
                />
            </AwModal>
        </div>
    </AwPage>
</template>

<script>
import isEqual from 'lodash/isEqual'

export default {
    name: 'ProfilePage',

    data() {
        return {
            title: 'AwForm',
            headline: this._getTitle('AwForm'),
            userData: {
                name: '',
                email: '',
                company: ''
            }
        }
    },

    computed: {
        user() {
            return {
                name: 'Some Name',
                email: 'mail@mail.com',
                company: ''
            }
        },

        isEqualData() {
            return isEqual(this.user, this.userData)
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
        uploadAvatar(imageFile) {
            console.log(imageFile)
        },

        resendEmail() {
            this.$axios.get('/api/email/resend')
        }
    },

    head() {
        return {
            title: this._getMetaTitle(this.title),
            meta: [this._getMetaDescription(this.title)]
        }
    }
}
</script>
