<template>
    <div>
        <AwGrid :col="{ lg: 2 }">
            <div>
                <p class="h6">{{ $t('AwesIoNuxtAdmin.first_name') }}</p>
                <AwInput
                    v-model="model.profile.first_name"
                    name="first_name"
                    :error="model.errors['profile.first_name']"
                />
            </div>
            <div>
                <p class="h6">{{ $t('AwesIoNuxtAdmin.last_name') }}</p>
                <AwInput
                    v-model="model.profile.last_name"
                    name="last_name"
                    :error="model.errors['profile.last_name']"
                />
            </div>
            <div :span="{ lg: 2 }">
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
            </div>
            <div>
                <p class="h6">{{ $t('AwesIoNuxtAdmin.email') }}</p>
                <AwInput
                    v-model="model.email"
                    name="email"
                    :error="model.errors.email"
                />
            </div>
            <div>
                <p class="h6">{{ $t('AwesIoNuxtAdmin.phone') }}</p>
                <AwInput
                    v-model="model.profile.phone"
                    name="phone"
                    :error="model.errors['profile.phone']"
                />
            </div>
            <div>
                <p class="h6">{{ $t('AwesIoNuxtAdmin.position') }}</p>
                <AwInput
                    v-model="model.profile.position"
                    name="position"
                    :error="model.errors['profile.position']"
                />
            </div>
            <div>
                <p class="h6">{{ $t('AwesIoNuxtAdmin.role') }}</p>
                <AwSelect
                    v-model="model.role.id"
                    :label="$t('AwesIoNuxtAdmin.role')"
                    :options="(text) => `/api/admin/roles?name=${text}&limit=100`"
                    option-label="name"
                    option-value="id"
                    :error="model.errors['role.id']"
                />
            </div>
            <div :span="{ lg: 2 }">
                <p class="h6">{{ $t('AwesIoNuxtAdmin.description') }}</p>
                <AwTextarea
                    v-model="model.profile.description"
                    name="description"
                    :error="model.errors['profile.description']"
                />
            </div>
            <div :span="{ lg: 2 }">
                <AwButton class="mt-5" @click="updateUser">
                    {{ $t('AwesIoNuxtAdmin.update') }}
                </AwButton>
            </div>
        </AwGrid>
    </div>
</template>

<script>
export default {
    name: 'UserUpdateInformation',

    props: ['model'],

    methods: {
        async updateUser() {
            try {
                await this.model.save()
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
