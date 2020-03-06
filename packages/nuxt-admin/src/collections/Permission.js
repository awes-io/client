import { BaseModel } from '@awes-io/vue-mc'

export default class Permission extends BaseModel {
    defaults() {
        return {
            id: null,
            name: null,
            description: null,
        }
    }
}
