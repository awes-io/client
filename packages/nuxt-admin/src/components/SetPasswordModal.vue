<template>
    <AwModal title="Set password" name="set_password">
        <AwGrid>
            <AwInput
                type="password"
                v-model="user.password"
                name="password"
                :label="$t('AwesIoNuxtAdmin.password')"
                :error="user.errors.password"
            />
            <AwInput
                type="password"
                v-model="user.password_confirmation"
                name="password_confirmation"
                :label="$t('AwesIoNuxtAdmin.password_confirmation')"
                :error="user.errors.password"
            />
            <AwButton
                @click="setPassword"
                :loading="isLoading"
                :disabled="!user.changed()"
            >
                {{ $t('AwesIoNuxtAdmin.update') }}
            </AwButton>
        </AwGrid>
    </AwModal>
</template>

<script>
export default {
    name: 'SetPasswordModal',

    data() {
        return {
            isLoading: false
        }
    },

    props: {
        user: {
            type: Object,
            required: true,
        }
    },

    methods: {
        async setPassword() {
            try {
                this.isLoading = true
                await this.user.setPassword()
                this.isLoading = false
                this.$root.$emit('modal::set_password:close')
            } catch (error) {
                this.isLoading = false
                console.log(error)
            }
        }
    }
}
</script>
