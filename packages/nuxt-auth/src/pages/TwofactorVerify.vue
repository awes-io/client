<template>
    <div>
        <p class="text-2xl text-center mb-4">
            {{ $t('AwesIoAuth.verifyTitle') }}
        </p>
        <AwForm v-bind="endpoint" @sended="_setUser">
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
import { path, pathOr } from 'ramda'

export default {
    name: 'PageVerify',

    layout: 'LayoutFrameCenter',

    auth: 'guest',

    middleware: function({ $auth, redirect }) {
        if (!$auth.getToken('twofactor')) {
            const loginUrl = pathOr(
                '/',
                ['options', 'redirect', 'login'],
                $auth
            )
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
            return path(
                ['strategies', 'twofactor', 'options', 'endpoints', 'verify'],
                this.$auth
            )
        }
    },

    methods: {
        async _setUser(data) {
            const _token = path(['data', 'meta', 'token'], data)
            const options = pathOr(
                {},
                ['$auth', 'strategies', 'twofactor', 'options'],
                this
            )

            const token = options.tokenType
                ? options.tokenType + ' ' + _token
                : _token

            await this.$auth.setUserToken(token)
            await this.$auth.fetchUser()

            const homeUrl = pathOr(
                '/',
                ['options', 'redirect', 'home'],
                this.$auth
            )

            this.$router.push(homeUrl)
        }
    }
}
</script>
