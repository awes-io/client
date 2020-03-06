import { BaseCollection } from '@awes-io/vue-mc'
import Role from './Role'

export default class Roles extends BaseCollection {
    model() {
        return Role
    }

    routes() {
        return {
            fetch: '/api/admin/roles'
        }
    }
}
