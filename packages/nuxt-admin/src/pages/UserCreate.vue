<template>
    <AwPage :title="$t('AwesIoNuxtAdmin.create_user')">
        <AwGrid :col="{ lg: 2 }">
            <div>
                <p class="h6">{{ $t('AwesIoNuxtAdmin.first_name') }}</p>
                <AwInput
                    v-model="user.first_name"
                    name="first_name"
                    :error="user.errors.first_name"
                />
            </div>
            <div>
                <p class="h6">{{ $t('AwesIoNuxtAdmin.last_name') }}</p>
                <AwInput
                    v-model="user.last_name"
                    name="last_name"
                    :error="user.errors.last_name"
                />
            </div>
            <div :span="{ lg: 2 }">
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
            </div>
            <div>
                <p class="h6">{{ $t('AwesIoNuxtAdmin.email') }}</p>
                <AwInput
                    v-model="user.email"
                    name="email"
                    :error="user.errors.email"
                />
            </div>
            <div>
                <p class="h6">{{ $t('AwesIoNuxtAdmin.phone') }}</p>
                <AwInput
                    v-model="user.phone"
                    name="phone"
                    :error="user.errors.phone"
                />
            </div>
            <div>
                <p class="h6">{{ $t('AwesIoNuxtAdmin.password') }}</p>
                <AwInput
                    type="password"
                    v-model="user.password"
                    name="password"
                    :error="user.errors.password"
                />
            </div>
            <div>
                <p class="h6">{{ $t('AwesIoNuxtAdmin.password_confirmation') }}</p>
                <AwInput
                    type="password"
                    v-model="user.password_confirmation"
                    name="password_confirmation"
                    :error="user.errors.password"
                />
            </div>
            <div>
                <p class="h6">{{ $t('AwesIoNuxtAdmin.position') }}</p>
                <AwInput
                    v-model="user.position"
                    name="position"
                    :error="user.errors.position"
                />
            </div>
            <div>
                <p class="h6">{{ $t('AwesIoNuxtAdmin.role') }}</p>
                <AwSelect
                    v-model="user.role"
                    :label="$t('AwesIoNuxtAdmin.role')"
                    :options="(text) => `/api/admin/roles?name=${text}&limit=100`"
                    option-label="name"
                    option-value="id"
                    :error="user.errors.role"
                />
            </div>
            <div :span="{ lg: 2 }">
                <p class="h6">{{ $t('AwesIoNuxtAdmin.description') }}</p>
                <AwTextarea
                    v-model="user.description"
                    name="description"
                    :error="user.errors.description"
                />
            </div>
            <div :span="{ lg: 2 }">
                <AwButton class="mt-5" @click="createUser">
                    {{ $t('AwesIoNuxtAdmin.create') }}
                </AwButton>
            </div>
        </AwGrid>
    </AwPage>
</template>

<script>
import User from '../collections/User'

export default {
    name: 'UserCreate',

    data() {
        return {
            user: new User()
        }
    },

    methods: {
        async createUser() {
            try {
                await this.user.save()
                this.$router.push({
                    path: `/admin/users`
                })
            } catch (error) {
                console.log(error)
            }
            
        }
    }
}
</script>
