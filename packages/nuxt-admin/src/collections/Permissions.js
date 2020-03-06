import { BaseCollection } from '@awes-io/vue-mc'
import Permission from './Permission'

export default class Permissions extends BaseCollection {
    model() {
        return Permission
    }
}
