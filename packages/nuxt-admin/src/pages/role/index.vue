<template>
    <div>
        <AwGrid :col="{ lg: 2 }">
            <div>
                <p class="h6">{{ $t('AwesIoNuxtAdmin.role_name') }}</p>
                <AwInput
                    v-model="model.name"
                    name="name"
                    :error="model.errors.name"
                />
                <AwSwitcher 
                    class="mt-5"
                    v-model="model.default_new"
                    :label="$t('AwesIoNuxtAdmin.default_role')"
                />
                <p class="h6">{{ $t('AwesIoNuxtAdmin.priority') }}</p>
                <AwInput
                    v-model="model.priority"
                    name="priority"
                    :error="model.errors.priority"
                />
                <p class="h6">{{ $t('AwesIoNuxtAdmin.description') }}</p>
                <AwTextarea
                    v-model="model.description"
                    name="description"
                    :error="model.errors.description"
                />
                <AwButton class="mt-5" @click="updateRole" :loading="model.saving">
                    {{ $t('AwesIoNuxtAdmin.update') }}
                </AwButton>
            </div>
        </AwGrid>
    </div>
</template>

<script>
import redirectToRoles from '../../mixins/redirectToRoles'

export default {
    name: 'RoleUpdateInformation',

    props: ['model'],

    mixins: [redirectToRoles],

    methods: {
        async updateRole() {
            try {
                await this.model.save()
                this.redirectToRoles()
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
