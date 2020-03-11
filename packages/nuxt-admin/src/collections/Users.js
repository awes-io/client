import { BaseCollection } from '@awes-io/vue-mc'
import User from './User'

export default class Users extends BaseCollection {
    model() {
        return User
    }

    routes() {
        return {
            fetch: '/api/admin/users'
        }
    }
}
