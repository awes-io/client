<template>
    <div>
        <!-- change password -->
        <h3 class="h4 mb-4">Change password</h3>
        <AwForm url="/api/profile">
            <AwInput label="Old password" />
            <AwInput label="New password" class="mt-2" />
            <AwInput label="Confirm password" class="mt-2" />
            <AwButton type="submit" text="Save" class="mt-4" />
        </AwForm>

        <!-- two factor -->
        <h3 class="h4 mt-8 mb-4">Two-factor authentication</h3>
        <AwSwitcher
            v-model="twoFactorEnabled"
            label="Two-factor authentication"
        />
        <AwAccordionFold :show="twoFactorEnabled">
            <!-- enable 2f form -->
            <AwForm url="/api/twofactor">
                <AwTel label="Please enter your phone" name="phone" />
                <AwButton type="submit" text="Enable" class="mt-4" />
            </AwForm>

            <!-- verify 2f -->
            <AwForm class="my-4" url="/api/twofactor/verify">
                <AwCode label="Please enter authorization token" name="token" />
                <AwButton type="submit" text="Enable" class="mt-4" />
            </AwForm>

            <AwButton @click="$root.$emit('modal::info:open')">Modal</AwButton>
        </AwAccordionFold>

        <!-- modal -->
        <AwModal theme="fullscreen" name="info" title="Activation info">
            <img src="//placehold.it/250" alt="" />
        </AwModal>
    </div>
</template>

<script>
export default {
    name: 'ProfileSecurityTab',

    data() {
        return {
            twoFactorEnabled: true
        }
    },

    watch: {
        twoFactorEnabled(isEnabled) {
            if (!isEnabled) {
                // this.$axios.delete('/api/twofactor')
            }
        }
    }
}
</script>
