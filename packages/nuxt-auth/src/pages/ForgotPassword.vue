<template>
    <div>
        <p class="text-2xl text-center mb-4">
            {{ $t('AwesIoAuth.forgotTitleEmail') }}
        </p>

        <!-- enter email form -->
        <AwForm
            v-if="!sended"
            url="/api/password/email"
            @sended="sended = true"
        >
            <AwInput
                name="email"
                type="email"
                :label="$t('AwesIoAuth.email')"
                required
                autocomplete="email"
            />
            <AwButton
                class="mt-6 mx-auto block"
                type="submit"
                :data-loading="$t('AwesIoAuth.loading')"
            >
                {{ $t('AwesIoAuth.continue') }}
            </AwButton>
        </AwForm>

        <!-- sended info -->
        <p v-else-if="sended" class="text-center">
            {{ $t('AwesIoAuth.forgotPasswordSended') }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'ForgotPassword',

    layout: 'LayoutFrameCenter',

    auth: 'guest',

    data() {
        return {
            sended: false
        }
    }
}
</script>
