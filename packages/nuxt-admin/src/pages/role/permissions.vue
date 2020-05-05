<template>
    <div>
        <AwTableBuilder :collection="allPermissions">
            <AwTableCol>
                <template #default="{ cell }">
                    <AwCheckbox
                        :value="cell.id.toString()"
                        v-model="selectedPermissions"
                        :error="model.errors.permissions"
                    />
                </template>
            </AwTableCol>
            <AwTableCol
                field="description"
                :title="$t('AwesIoNuxtAdmin.description')"
            />
            <AwTableCol field="name" :title="$t('AwesIoNuxtAdmin.name')" />
        </AwTableBuilder>
        <AwButton
            class="mt-5"
            @click="updateRolePermissions"
            :loading="permissions.saving"
            :disabled="!permissionsChanged"
        >
            {{ $t('AwesIoNuxtAdmin.update') }}
        </AwButton>
    </div>
</template>

<script>
import Permissions from '@awes-io/nuxt-admin/src/collections/Permissions'
import redirectToRoles from '@awes-io/nuxt-admin/src/mixins/redirectToRoles'

export default {
    name: 'RoleUpdatePermissions',

    props: ['model'],

    mixins: [redirectToRoles],

    data() {
        return {
            permissions: new Permissions(this.model.$.permissions),
            allPermissions: new Permissions(),
            permissionsChanged: false
        }
    },

    async mounted() {
        this.permissions.set('id', this.model.$.id)
    },

    methods: {
        async updateRolePermissions() {
            try {
                await this.permissions.save()
                this.redirectToRoles()
            } catch (error) {
                console.log(error)
            }
        }
    },

    computed: {
        selectedPermissions: {
            get() {
                return this.permissions.map('id').map(String)
            },
            set(permissions) {
                this.permissionsChanged = true
                const selected = this.allPermissions.filter(({ id }) =>
                    permissions.includes(String(id))
                )
                this.permissions.replace(selected.models)
            }
        }
    }
}
</script>
