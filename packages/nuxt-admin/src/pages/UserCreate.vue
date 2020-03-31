<template>
    <AwPage :title="$t('AwesIoNuxtAdmin.create_user')" :breadcrumb="breadcrumb">
        <AwGrid :col="{ lg: 2 }">
            <AwInfo :label="$t('AwesIoNuxtAdmin.gender')" :span="{ lg: 2 }">
                <AwRadio
                    class="inline-block"
                    v-model="user.sex"
                    :label="$t('AwesIoNuxtAdmin.male')"
                    value="male"
                    :error="user.errors.sex"
                />
                <AwRadio
                    class="inline-block ml-3"
                    v-model="user.sex"
                    :label="$t('AwesIoNuxtAdmin.female')"
                    value="female"
                />
            </AwInfo>

            <AwInput
                v-model="user.first_name"
                name="first_name"
                :label="$t('AwesIoNuxtAdmin.first_name')"
                :error="user.errors.first_name"
                autocomplete="given-name"
            />
            <AwInput
                v-model="user.last_name"
                :label="$t('AwesIoNuxtAdmin.last_name')"
                name="last_name"
                :error="user.errors.last_name"
                autocomplete="family-name"
            />

            <AwInput
                :label="$t('AwesIoNuxtAdmin.email')"
                v-model="user.email"
                name="email"
                :error="user.errors.email"
                autocomplete="email"
            />

            <AwTel
                :label="$t('AwesIoNuxtAdmin.phone')"
                v-model="user.phone"
                name="phone"
                :error="user.errors.phone"
                autocomplete="tel"
            />

            <AwInput
                type="password"
                :label="$t('AwesIoNuxtAdmin.password')"
                v-model="user.password"
                name="password"
                :error="user.errors.password"
                autocomplete="new-password"
            />
            <AwInput
                type="password"
                :label="$t('AwesIoNuxtAdmin.password_confirmation')"
                v-model="user.password_confirmation"
                name="password_confirmation"
                :error="user.errors.password"
                autocomplete="new-password"
            />

            <AwInput
                :label="$t('AwesIoNuxtAdmin.position')"
                v-model="user.position"
                name="position"
                :error="user.errors.position"
            />

            <AwTextarea
                :span="{ lg: 2 }"
                :label="$t('AwesIoNuxtAdmin.description')"
                v-model="user.description"
                name="description"
                :error="user.errors.description"
            />

            <AwSelect
                v-model="user.role"
                :label="$t('AwesIoNuxtAdmin.role')"
                :options="text => `/api/admin/roles?name=${text}&limit=100`"
                option-label="name"
                track-by="id"
                :error="user.errors.role"
            />
        </AwGrid>

        <AwGrid :col="{ lg: 2 }">
            <div :span="{ lg: 2 }">
                <AwButton
                    class="mt-5"
                    @click="createUser"
                    :loading="user.saving"
                    :disabled="!user.changed()"
                >
                    {{ $t('AwesIoNuxtAdmin.create') }}
                </AwButton>
            </div>
        </AwGrid>
    </AwPage>
</template>

<script>
import User from '../collections/User'
import redirectToUsers from '../mixins/redirectToUsers'

export default {
    name: 'UserCreate',

    mixins: [redirectToUsers],

    data() {
        return {
            user: new User(),
            breadcrumb: {
                title: this.$t('AwesIoNuxtAdmin.employees'),
                href: '/admin/users'
            }
        }
    },

    methods: {
        async createUser() {
            try {
                await this.user.save()
                this.redirectToUsers()
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
