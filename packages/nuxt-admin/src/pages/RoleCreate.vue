<template>
    <AwPage :title="$t('AwesIoNuxtAdmin.create_role')" :breadcrumb="breadcrumb" >
        <AwGrid :col="{ lg: 2 }">
            <div>
                <p class="h6">{{ $t('AwesIoNuxtAdmin.role_name') }}</p>
                <AwInput
                    v-model="role.name"
                    name="name"
                    :error="role.errors.name"
                />
                <AwSwitcher 
                    class="mt-5"
                    v-model="role.default_new"
                    :label="$t('AwesIoNuxtAdmin.default_role')"
                />
                <p class="h6">{{ $t('AwesIoNuxtAdmin.priority') }}</p>
                <AwInput
                    v-model="role.priority"
                    name="priority"
                    :error="role.errors.priority"
                />
                <p class="h6">{{ $t('AwesIoNuxtAdmin.description') }}</p>
                <AwTextarea
                    v-model="role.description"
                    name="description"
                    :error="role.errors.description"
                />
                <AwButton class="mt-5" @click="createRole" :loading="role.saving">
                    {{ $t('AwesIoNuxtAdmin.create') }}
                </AwButton>
            </div>
        </AwGrid>
    </AwPage>
</template>

<script>
import Role from '../collections/Role'

export default {
    name: 'RoleCreate',

    data() {
        return {
            role: new Role(),
            breadcrumb: {
                title: this.$t('AwesIoNuxtAdmin.roles'),
                href: '/admin/roles'
            }
        }
    },

    methods: {
        async createRole() {
            try {
                await this.role.save()
                this.$router.push({
                    path: `/admin/roles`
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
