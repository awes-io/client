<template>
    <div>
        <p class="text-2xl text-center mb-4">
            {{ $t('AwesIoAuth.registerTitle') }}
        </p>

        <!-- register form -->
        <AwForm url="/api/register" @sended="logIn">
            <AwInput
                v-model="email"
                name="email"
                :label="$t('AwesIoAuth.email')"
                required
                autocomplete="email"
            />
            <AwInput
                class="mt-3"
                name="name"
                :label="$t('AwesIoAuth.fullName')"
                required
                autocomplete="name"
            />
            <AwInput
                class="mt-3"
                name="company"
                :label="$t('AwesIoAuth.company')"
            />
            <AwPassword
                v-model="password"
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
            <AwButton
                class="mt-4 w-full"
                type="submit"
                :data-loading="$t('AwesIoAuth.loading')"
            >
                {{ $t('AwesIoAuth.register') }}
            </AwButton>
        </AwForm>

        <!-- registered notify -->
        <p class="mt-8 text-center">
            {{ $t('AwesIoAuth.haveAccount') }}
            <AwLink
                :href="localePath({ path: '/login' })"
                :text="$t('AwesIoAuth.login')"
            />
        </p>

        <!-- social register -->
        <% if (socialLogin) { %>
        <div v-if="$route.meta.socialLogin" class="mt-4 flex justify-center">
            <AwButton color="info" @click="loginWithService('google')">
                Google
            </AwButton>
        </div>
        <% } %>
    </div>
</template>

<script>
export default {
    name: 'PageRegister',

    layout: 'LayoutFrameCenter',

    auth: 'guest',

    data() {
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        async loginWithService(service) {
            try {
                const { data } = await this.$axios.get('/api/login/' + service)
                if (data.url) {
                    window.location = data.url
                }
            } catch (e) {
                // this._setErrors(e)
                console.log(e.request, e.response)
            }
        },

        async logIn() {
            await this.$auth.loginWith('twofactor', {
                data: {
                    email: this.email,
                    password: this.password
                }
            })
        }
    }
}
</script>
