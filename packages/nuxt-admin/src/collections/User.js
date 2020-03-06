import { BaseModel } from '@awes-io/vue-mc'

export default class User extends BaseModel {
    defaults() {
        return {
            id: null,
            email: '',
            full_name: '',
            last_activity: '',
            status_sys: '',
            status_text: '',
            role: '',

            first_name: '',
            last_name: '',
            sex: '',
            phone: '',
            password: '',
            password_confirmation: '',
            position: '',
            role: null,
            description: '',
        }
    }

    routes() {
        return {
            save: `/api/admin/users`,
        }
    }
}
