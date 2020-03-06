<template>
    <AwPage :title="$t('AwesIoNuxtAdmin.employees')">
        <template #buttons>
            <AwButton href="/admin/users/create" class="ml-4 min-w-0" size="sm">
                <AwIcon name="plus" />
                <span class="hidden sm:inline-block">{{ $t('AwesIoNuxtAdmin.create_user') }}</span>
            </AwButton>
        </template>

        <div class="flex flex-wrap items-center">
            <div class="mb-4 mr-4 lg:mr-0">
                <AwButtonNav :items="filters" />
            </div>
            <div class="mb-4 flex-grow flex justify-end">
                <AwSearch class="w-full lg:w-auto" />
            </div>
        </div>

        <AwTableBuilder :collection="users" @click:row="showUser" :watch-params="['status', 'search']">
            <AwTableCol :title="$t('AwesIoNuxtAdmin.employee')">
                <template #default="{ cell }">
                    {{ cell.full_name }}<br>
                    <span class="text-disabled">{{ cell.email }}</span>
                </template>
            </AwTableCol>
            <AwTableCol field="role" :title="$t('AwesIoNuxtAdmin.role')" />
            <AwTableCol :title="$t('AwesIoNuxtAdmin.status')">
                <template #default="{ cell }">
                    <span :class="`text-` + cell.status_sys">{{ cell.status_text }}</span>
                </template>
            </AwTableCol>
            <AwTableCol field="last_activity" :title="$t('AwesIoNuxtAdmin.last_activity')" />
            <template #dropdown="{ cell }">
                <AwDropdownButton :text="$t('AwesIoNuxtAdmin.edit')" @click.stop="showRole(cell)" />
                <AwDropdownButton color="error" :text="$t('AwesIoNuxtAdmin.block')" @click.stop="showRole(cell)" />
            </template>
        </AwTableBuilder>
    </AwPage>
</template>

<script>
import Users from '../collections/Users'

export default {
    name: 'Users',

    data() {
        return {
            users: new Users(),
            filters: [
                { text: this.$t('AwesIoNuxtAdmin.all'), href: { query: { status: null } } },
                { text: this.$t('AwesIoNuxtAdmin.active'), href: { query: { status: '1' } } },
                { text: this.$t('AwesIoNuxtAdmin.blocked'), href: { query: { status: '0' } } },
            ]
        }
    },

    methods: {
        showUser(cell) {
            this.$router.push({
                path: `/admin/users/${cell.id}`
            })
        },
    }
}
</script>
