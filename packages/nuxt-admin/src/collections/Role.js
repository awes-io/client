import { BaseModel } from '@awes-io/vue-mc'

export default class Role extends BaseModel {
    defaults() {
        return {
            id: null,
            name: '',
            default_new: false,
            priority: null,
            description: '',
            permissions: [],
        }
    }

    routes() {
        return {
            fetch: `/api/admin/roles/{id}`,
            save: `/api/admin/roles`,
            update: `/api/admin/roles/{id}`,
        }
    }
}
