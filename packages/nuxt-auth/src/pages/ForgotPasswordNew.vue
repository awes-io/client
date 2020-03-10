<template>
    <div>
        <p class="text-2xl text-center mb-4">
            {{ $t('AwesIoAuth.forgotTitlePassword') }}
        </p>

        <!-- reset password form -->
        <AwForm url="/api/password/reset/" @sended="_redirectToLogin">
            <AwPassword
                class="mt-3"
                name="password"
                :label="$t('AwesIoAuth.password')"
                required
                autocomplete="new-password"
            />
            <AwPassword
                class="mt-3"
                name="password_confirmation"
                :label="$t('AwesIoAuth.passwordConfirm')"
                required
                autocomplete="new-password"
            />
            <input type="hidden" name="token" :value="token" />
            <input type="hidden" name="email" :value="email" />
            <AwButton
                class="mt-6 mx-auto block"
                type="submit"
                :data-loading="$t('AwesIoAuth.loading')"
            >
                {{ $t('AwesIoAuth.continue') }}
            </AwButton>
        </AwForm>
    </div>
</template>

<script>
import { path, pathOr } from 'ramda'

export default {
    name: 'ForgotPassword',

    layout: 'LayoutFrameCenter',

    auth: 'guest',

    data() {
        return {
            sended: false
        }
    },

    computed: {
        token() {
            return path(['params', 'token'], this.$route)
        },

        email() {
            return path(['query', 'email'], this.$route)
        }
    },

    methods: {
        _redirectToLogin() {
            const loginUrl = pathOr(
                '/',
                ['options', 'redirect', 'home'],
                this.$auth
            )
            this.$router.push(loginUrl)
        }
    }
}
</script>
