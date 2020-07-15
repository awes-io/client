<template>
    <div>
        <p class="text-2xl text-center mb-4">
            {{ $t('AwesIoAuth.loginTitle') }}
        </p>

        <!-- login form -->
        <AwForm @submit.prevent="logIn" ref="loginForm">
            <AwInput
                v-model="formData.email"
                type="email"
                name="email"
                :label="$t('AwesIoAuth.email')"
                required
                autocomplete="email"
            />
            <AwPassword
                v-model="formData.password"
                class="mt-3"
                name="password"
                :label="$t('AwesIoAuth.password')"
                required
                autocomplete="current-password"
            />
            <div class="flex items-center justify-between mt-1">
                <AwCheckbox
                    v-model="remember"
                    class="ml-3"
                    :label="$t('AwesIoAuth.rememberMe')"
                    enter-skip
                />
                <AwLink
                    :href="localePath({ path: '/forgot-password' })"
                    :text="$t('AwesIoAuth.forgotPassword')"
                />
            </div>
            <AwButton :loading="loading" class="mt-4 w-full" type="submit">
                {{ $t('AwesIoAuth.login') }}
            </AwButton>
        </AwForm>

        <!-- registration notify -->
        <% if (register && register === true) { %>
        <p class="mt-8 text-center">
            {{ $t('AwesIoAuth.noAccount') }}
            <AwLink
                :href="localePath({ path: '/register' })"
                :text="$t('AwesIoAuth.register')"
            />
        </p>
        <% } else if (typeof register === 'string') { %>
        <p class="mt-8 text-center">
            <%= register %>
        </p>
        <% } %>

        <!-- social login -->
        <div
            v-if="$route.meta.socialLogin"
            class="mt-4 -mx-2 flex justify-center"
        >
            <div class="flex-1 px-2">
                <AwButton
                    class="w-full"
                    color="google"
                    @click="loginWithService('google')"
                >
                    <svg
                        class="inline mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                    >
                        <path
                            d=" M 17.816 9.189 C 17.816 8.559 17.756 7.939 17.656 7.349 L 9.176 7.349 L 9.176 10.829 L 14.016 10.829 C 13.814 11.944 13.163 12.927 12.216 13.549 L 12.216 15.809 L 15.136 15.809 C 16.927 14.082 17.901 11.676 17.816 9.189 Z "
                            fill="rgb(66,133,244)"
                        />
                        <path
                            d=" M 9.176 17.989 C 11.368 18.049 13.5 17.269 15.136 15.809 L 12.226 13.549 C 10.819 14.469 9.063 14.681 7.477 14.122 C 5.891 13.563 4.656 12.298 4.136 10.699 L 1.136 10.699 L 1.136 13.029 C 2.663 16.069 5.774 17.988 9.176 17.989 Z "
                            fill="rgb(52,168,83)"
                        />
                        <path
                            d=" M 4.136 10.699 C 3.766 9.589 3.766 8.389 4.136 7.279 L 4.136 4.949 L 1.136 4.949 C -0.141 7.491 -0.141 10.487 1.136 13.029 L 4.136 10.699 Z "
                            fill="rgb(251,188,5)"
                        />
                        <path
                            d=" M 9.176 3.569 C 10.496 3.569 11.676 4.019 12.616 4.919 L 15.196 2.329 C 13.116 0.45 10.278 -0.353 7.521 0.159 C 4.765 0.671 2.404 2.438 1.136 4.939 L 4.136 7.279 C 4.845 5.088 6.874 3.595 9.176 3.569 Z "
                            fill="rgb(234,67,53)"
                        />
                    </svg>

                    Google
                </AwButton>
            </div>
            <!-- <div class="flex-1 px-2">
                <AwButton class="w-full" color="facebook" @click="loginWithService('facebook')">
                    Facebook
                </AwButton>
            </div> -->
        </div>
    </div>
</template>

<script>
import { pathOr } from 'ramda'

export default {
    name: 'PageLogin',

    layout: 'LayoutFrameCenter',

    auth: 'guest',

    data() {
        return {
            loading: false,
            remember: false,
            formData: {
                email: '',
                password: ''
            }
        }
    },

    methods: {
        async logIn() {
            this.loading = true
            this.$refs.loginForm.loading = true

            try {
                await this.$auth.loginWith('twofactor', {
                    data: {
                        email: this.formData.email,
                        password: this.formData.password
                    }
                })
            } catch (e) {
                this.loading = false
                this.$refs.loginForm.loading = false
                this._setErrors(e)
            }
        },

        async loginWithService(service) {
            try {
                const { data } = await this.$axios.get('/api/login/' + service)
                if (data.url) {
                    window.location = data.url
                }
            } catch (e) {
                this._setErrors(e)
            }
        },

        _setErrors(errorObj) {
            const errors = pathOr(
                null,
                ['response', 'data', 'errors'],
                errorObj
            )

            if (
                errors &&
                typeof this.$refs.loginForm.setErrors === 'function'
            ) {
                this.$refs.loginForm.setErrors(errors)
            } else {
                console.log(errorObj)
            }
        }
    }
}
</script>

<style lang="postcss">
.color-google {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.54);
    font-weight: 700;
    font-family: Roboto, 'Open Sans', sans-serifж;
}

.color-facebook {
    background-color: #4267b2;
    color: #fff;
    font-weight: 700;
}
</style>
