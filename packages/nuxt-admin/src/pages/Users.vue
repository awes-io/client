<template>
    <AwPage :title="$t('AwesIoNuxtAdmin.employees')">
        <template #buttons>
            <AwButton href="/admin/users/create" class="ml-4 min-w-0" size="sm">
                <AwIcon name="plus" />
                <span class="hidden sm:inline-block">{{
                    $t('AwesIoNuxtAdmin.create_user')
                }}</span>
            </AwButton>
            <AwButton
                href="/admin/roles"
                class="ml-4 min-w-0"
                size="sm"
                color="warning"
            >
                <AwIcon name="user" class="sm:hidden" />
                <span class="sr-only sm:not-sr-only">{{
                    $t('AwesIoNuxtAdmin.roles')
                }}</span>
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

        <AwTableBuilder
            :collection="users"
            @click:row="showUser"
            :orderable="{ param: 'order' }"
            :watch-params="['status', 'search', 'order']"
        >
            <AwTableCol :title="$t('AwesIoNuxtAdmin.employee')">
                <template #default="{ cell }">
                    {{ cell.full_name }}<br />
                    <span class="text-disabled">{{ cell.email }}</span>
                </template>
            </AwTableCol>
            <AwTableCol
                field="role.name"
                :orderable="{ templateValue: 'role_name' }"
                :title="$t('AwesIoNuxtAdmin.role')"
            />
            <AwTableCol
                :title="$t('AwesIoNuxtAdmin.status')"
                :orderable="{ templateValue: 'status_text' }"
            >
                <template #default="{ cell }">
                    <span :class="`text-` + cell.status_sys">{{
                        cell.status_text
                    }}</span>
                </template>
            </AwTableCol>
            <AwTableCol
                field="last_activity"
                :title="$t('AwesIoNuxtAdmin.last_activity')"
                orderable
            />
            <template #dropdown="{ cell }">
                <AwDropdownButton
                    :text="$t('AwesIoNuxtAdmin.edit')"
                    @click.stop="showUser(cell)"
                />
                <AwDropdownButton
                    :text="$t('AwesIoNuxtAdmin.reset_password')"
                    @click.stop="cell.resetPassword()"
                />
                <AwDropdownButton
                    v-if="cell.status"
                    color="error"
                    :text="$t('AwesIoNuxtAdmin.block')"
                    @click.stop="cell.block()"
                />
                <AwDropdownButton
                    v-else
                    color="success"
                    :text="$t('AwesIoNuxtAdmin.activate')"
                    @click.stop="cell.activate()"
                />
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
                {
                    text: this.$t('AwesIoNuxtAdmin.all'),
                    href: { query: {} }
                },
                {
                    text: this.$t('AwesIoNuxtAdmin.active'),
                    href: { query: { status: '1' } }
                },
                {
                    text: this.$t('AwesIoNuxtAdmin.blocked'),
                    href: { query: { status: '0' } }
                }
            ]
        }
    },

    methods: {
        showUser(cell) {
            this.$router.push({
                path: `/admin/users/${cell.id}`
            })
        }
    }
}
</script>
