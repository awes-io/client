<template>
    <div>
        <AwCheckbox v-for="permission in allPermissions" 
            :key="permission.id" 
            :label="permission.name" 
            :value="permission.id"
            v-model="permissions.models"
        />
        {{permissions.models}}
    </div>
</template>

<script>
import Permissions from '../../collections/Permissions'

export default {
    name: 'RoleUpdatePermissions',

    props: ['model'],

    data() {
        return {
            permissions: new Permissions(this.model.$.permissions.map((p) => {return {id: p.id} })),
            allPermissions: [
                { "id": 1, "name": "view dashboard", "description": "awesio-laraveladmin::permissions.descriptions.view dashboard" }, 
                { "id": 2, "name": "view analytics", "description": "awesio-laraveladmin::permissions.descriptions.view analytics" } 
            ]
        }
    },

    mounted() {
        // this.permissions.set('id', this.model.$.id);
    }
}
</script>
