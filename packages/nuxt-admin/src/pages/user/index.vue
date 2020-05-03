<template>
    <AwGrid :col="{ lg: 2 }">
        <AwInfo :label="$t('AwesIoNuxtAdmin.gender')" :span="{ lg: 2 }">
            <AwRadio
                class="inline-block"
                v-model="model.profile.sex"
                :label="$t('AwesIoNuxtAdmin.male')"
                value="male"
                :error="model.errors['profile.sex']"
            />
            <AwRadio
                class="inline-block ml-3"
                v-model="model.profile.sex"
                :label="$t('AwesIoNuxtAdmin.female')"
                value="female"
            />
            <AwRadio
                class="inline-block ml-3"
                v-model="model.profile.sex"
                :label="$t('AwesIoNuxtAdmin.divers')"
                value="divers"
            />
        </AwInfo>

        <AwInput
            v-model="model.profile.first_name"
            name="first_name"
            :label="$t('AwesIoNuxtAdmin.first_name')"
            :error="model.errors['profile.first_name']"
            autocomplete="given-name"
        />
        <AwInput
            v-model="model.profile.last_name"
            :label="$t('AwesIoNuxtAdmin.last_name')"
            name="last_name"
            :error="model.errors['profile.last_name']"
            autocomplete="family-name"
        />

        <AwInput
            :label="$t('AwesIoNuxtAdmin.email')"
            v-model="model.email"
            name="email"
            :error="model.errors.email"
            autocomplete="email"
        />

        <AwTel
            :label="$t('AwesIoNuxtAdmin.phone')"
            v-model="model.profile.phone"
            name="phone"
            :error="model.errors['profile.phone']"
            autocomplete="tel"
        />

        <AwInput
            :label="$t('AwesIoNuxtAdmin.position')"
            v-model="model.profile.position"
            name="position"
            :error="model.errors['profile.position']"
        />

        <AwTextarea
            :span="{ lg: 2 }"
            :label="$t('AwesIoNuxtAdmin.description')"
            v-model="model.profile.description"
            name="description"
            :error="model.errors['profile.description']"
        />

        <AwSelect
            v-model="model.role.id"
            :label="$t('AwesIoNuxtAdmin.role')"
            :options="text => `/api/admin/roles?name=${text}&limit=100`"
            option-label="name"
            track-by="id"
            :error="model.errors['role.id']"
        />
        <div class="hidden md:block" />

        <hr :span="{ lg: 2 }" />

        <AwInfo label="Is it active user?">
            <AwSwitcher
                v-model="model.status"
                :label="model.status === 1 ? 'Active' : 'Deactivated'"
            />
        </AwInfo>
        <div :span="{ lg: 2 }" class="flex">
            <AwButton
                class="mt-5"
                @click="updateUser"
                :loading="model.saving"
                :disabled="!model.changed()"
            >
                {{ $t('AwesIoNuxtAdmin.update') }}
            </AwButton>

            <AwButton
                class="mt-5 ml-3"
                theme="ghost"
                color="default"
                @click="model.reset()"
                :disabled="!model.changed()"
            >
                {{ $t('AwesIoNuxtAdmin.reset') }}
            </AwButton>
        </div>
    </AwGrid>
</template>

<script>
import redirectToUsers from '../../mixins/redirectToUsers'

export default {
    name: 'UserUpdateInformation',

    props: ['model'],

    mixins: [redirectToUsers],

    methods: {
        async updateUser() {
            try {
                await this.model.save()
                this.$notify({
                    title: this.$t('AwesIoNuxtAdmin.user_edit.popup.header'),
                    text: this.$t('AwesIoNuxtAdmin.user_edit.popup.text'),
                    type: 'success'
                })
                this.redirectToUsers()
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
