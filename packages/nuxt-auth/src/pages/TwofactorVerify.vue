<template>
    <div>
        <p class="text-2xl text-center mb-4">
            {{ $t('AwesIoAuth.verifyTitle') }}
        </p>
        <AwForm v-bind="endpoint" @submit.prevent="send">
            <AwCode
                v-model="token"
                name="token"
                :label="$t('AwesIoAuth.email')"
                required
                @change="$nextTick(() => $refs.submit.$el.click())"
            />
            <AwButton ref="submit" class="hidden" type="submit">
                {{ $t('AwesIoAuth.continue') }}
            </AwButton>
        </AwForm>
    </div>
</template>

<script>
import { pathOr } from 'rambdax'

export default {
    name: 'PageVerify',

    layout: 'LayoutFrameCenter',

    auth: 'guest',

    middleware: function({ $auth, redirect }) {
        if (!$auth.getToken('twofactor')) {
            const loginUrl = pathOr('/login', 'options.redirect.login', $auth)
            return redirect(loginUrl)
        }
    },

    data() {
        return {
            token: '',
            error: ''
        }
    },

    computed: {
        endpoint() {
            return pathOr(
                {},
                'strategies.twofactor.options.endpoints.verify',
                this.$auth
            )
        }
    },

    methods: {
        async send() {
            try {
                const { data } = await this.$axios.request({
                    ...this.endpoint,
                    data: { token: this.token }
                })
                const token = pathOr(false, 'meta.token', data)

                // set token
                const twofactor = this.$auth.strategies.twofactor
                await twofactor.setUserToken(token)
            } catch (e) {
                const message = pathOr(e.message, 'response.data.message', e)
                const statusCode = pathOr(500, 'response.status', e)
                this.$nuxt.error({ message, statusCode })
            }
        }
    }
}
</script>
