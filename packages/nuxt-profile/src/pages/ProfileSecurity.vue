<template>
    <div>
        <!-- change password -->
        <h3 class="h4 mb-4">{{ $t('AwesIoProfile.changePassword') }}</h3>

        <!-- change password form -->
        <AwForm
            ref="passwordForm"
            url="/api/profile/password"
            @sended="$refs.passwordForm.$el.reset()"
        >
            <AwPassword
                :label="$t('AwesIoProfile.oldPassword')"
                name="password_current"
                autocomplete="current-password"
                required
            />
            <AwPassword
                :label="$t('AwesIoProfile.newPassword')"
                name="password"
                class="mt-2"
                autocomplete="new-password"
                required
            />
            <AwPassword
                :label="$t('AwesIoProfile.passwordConfirm')"
                name="password_confirmation"
                class="mt-2"
                autocomplete="new-password"
                required
            />
            <AwButton
                type="submit"
                :text="$t('AwesIoProfile.submitPassword')"
                class="mt-4"
                :data-loading="$t('AwesIoProfile.loading')"
            />
        </AwForm>

        <!-- two factor -->
        <h3 class="h4 mt-8 mb-4">{{ $t('AwesIoProfile.twoFactorAuth') }}</h3>

        <AwSwitcher
            v-model="switcher"
            :disabled="switcherDisabled"
            :label="$t('AwesIoProfile.twoFactorAuth')"
        />

        <!-- two factor form -->
        <AwAccordionFold class="mt-4" :show="switcher">
            <!-- enable 2f form -->
            <AwForm
                v-if="!twoFactorEnabled"
                url="/api/twofactor"
                @sended="_onPhoneSend"
            >
                <AwTel
                    :label="$t('AwesIoProfile.phone')"
                    name="phone"
                    autocomplete="tel"
                    required
                />
                <AwButton
                    type="submit"
                    :text="$t('AwesIoProfile.enable')"
                    class="mt-4"
                    :data-loading="$t('AwesIoProfile.loading')"
                />
            </AwForm>

            <!-- verify -->
            <template v-if="twoFactorEnabled && !twoFactorVerified">
                <AwButton
                    :text="$t('AwesIoProfile.showInfo')"
                    @click="$refs.infoModal.open()"
                />

                <!-- modal -->
                <AwModal
                    theme="fullscreen"
                    ref="infoModal"
                    name="info"
                    :title="$t('AwesIoProfile.showInfo')"
                >
                    <div class="max-w-sm mx-auto text-center">
                        <p class="text-xl">
                            {{ $t('AwesIoProfile.infoTitle') }}
                        </p>
                        <p class="mt-6">
                            {{ $t('AwesIoProfile.infoText') }}
                        </p>
                        <img
                            class="inline-block mt-6"
                            v-if="qrCode"
                            :src="qrCode"
                            alt=""
                        />

                        <AwForm
                            url="/api/twofactor/verify"
                            class="mt-6"
                            @sended="$auth.fetchUser()"
                        >
                            <AwCode
                                :label="$t('AwesIoProfile.verifyToken')"
                                name="token"
                                @change="
                                    $nextTick(() => $refs.submit.$el.click())
                                "
                            />
                            <AwButton
                                ref="submit"
                                type="submit"
                                :text="$t('AwesIoProfile.enable')"
                                class="sr-only"
                            />
                        </AwForm>

                        <p class="mt-12 mb-6 text-center">
                            {{ $t('AwesIoProfile.infoInstall') }}
                        </p>

                        <div class="flex justify-center items-center -mx-2">
                            <div class="px-2">
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                                    target="_blank"
                                >
                                    <img
                                        class="w-48"
                                        src="../assets/img/google.png"
                                    />
                                    <span class="sr-only">GooglePlay</span>
                                </a>
                            </div>
                            <div class="px-2">
                                <a
                                    href="https://apps.apple.com/us/app/google-authenticator/id388497605"
                                    target="_blank"
                                >
                                    <img
                                        class="w-48"
                                        src="../assets/img/apple.png"
                                    />
                                    <span class="sr-only">AppStore</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </AwModal>
            </template>

            <!-- verified -->
            <AwButton
                v-if="twoFactorVerified"
                :text="$t('AwesIoProfile.disable')"
                @click="twoFactorDisable()"
            />
        </AwAccordionFold>
    </div>
</template>

<script>
import { pathOr } from 'rambdax'
import { mapState } from 'vuex'

export default {
    name: 'ProfileSecurityTab',

    data() {
        return {
            switcher: false,
            switcherDisabled: false
        }
    },

    computed: {
        ...mapState('auth', ['user']),

        qrCode() {
            return pathOr(null, 'twoFactor.qrCode.qr_code', this.user)
        },

        twoFactorEnabled() {
            return !!pathOr(false, 'twoFactor', this.user)
        },

        twoFactorVerified() {
            return !!pathOr(false, 'twoFactor.verified', this.user)
        }
    },

    watch: {
        twoFactorEnabled: {
            handler(isEnabled) {
                if (isEnabled !== this.switcher) {
                    this.switcher = isEnabled
                }
            },
            immediate: true
        },

        switcher(isEnabled) {
            if (!isEnabled) {
                this.twoFactorDisable()
            }
        }
    },

    methods: {
        async twoFactorDisable() {
            this.switcherDisabled = true
            try {
                await this.$axios.delete('/api/twofactor')
                await this.$auth.fetchUser()
            } catch (e) {
                console.log(e)
            } finally {
                this.switcherDisabled = false
            }
        },

        async _onPhoneSend() {
            await this.$auth.fetchUser()
            this.$refs.infoModal.open()
        }
    }
}
</script>
