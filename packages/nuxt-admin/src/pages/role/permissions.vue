<template>
    <div>
        <AwTableBuilder :collection="allPermissions">
            <AwTableCol>
                <template #default="{ cell }">
                    <AwCheckbox :value="cell.id.toString()" v-model="model.permissions" :error="model.errors.permissions" />
                </template>
            </AwTableCol>
            <AwTableCol field="description" :title="$t('AwesIoNuxtAdmin.description')" />
            <AwTableCol field="name" :title="$t('AwesIoNuxtAdmin.name')" />
        </AwTableBuilder>
        <AwButton class="mt-5" @click="updateRolePermissions" :loading="model.saving">
            {{ $t('AwesIoNuxtAdmin.update') }}
        </AwButton>
        <div>{{permissions.models}}</div>
    </div>
</template>

<script>
import Permissions from '../../collections/Permissions'

export default {
    name: 'RoleUpdatePermissions',

    props: ['model'],

    data() {
        return {
            permissions: new Permissions(this.model.$.permissions),
            allPermissions: new Permissions(),
        }
    },

    async mounted() {
        this.permissions.set('id', this.model.$.id);
    },

    methods: {
        updateRolePermissions() {
            this.permissions.save()
        }
    }
}
</script>
