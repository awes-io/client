<template>
    <AwPage :title="$t('AwesIoNuxtAdmin.roles')">
        <template #buttons>
            <AwButton href="/admin/roles/create" class="ml-4 min-w-0" size="sm">
                <AwIcon name="plus" />
                <span class="hidden sm:inline-block">{{ $t('AwesIoNuxtAdmin.create_role') }}</span>
            </AwButton>
        </template>
        <AwTableBuilder :collection="roles" @click:row="showRole">
            <AwTableCol field="name" :title="$t('AwesIoNuxtAdmin.role')" />
            <AwTableCol field="description" :title="$t('AwesIoNuxtAdmin.description')" />
            <AwTableCol field="priority" :title="$t('AwesIoNuxtAdmin.priority')" />
            <AwTableCol :title="$t('AwesIoNuxtAdmin.permissions')">
                <template #default="{ cell }">
                    {{ cell.permissions.length }} {{ $t('AwesIoNuxtAdmin.from') }} {{ cell.permissions_total }} {{ $t('AwesIoNuxtAdmin.permissions') }}
                </template>
            </AwTableCol>
        </AwTableBuilder>
    </AwPage>
</template>

<script>
import Roles from '../collections/Roles'

export default {
    name: 'Roles',

    data() {
        return {
            roles: new Roles()
        }
    },

    methods: {
        showRole(cell) {
            this.$router.push({
                path: `/admin/roles/${cell.id}`
            })
        },
    }
}
</script>
