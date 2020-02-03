import Vue from 'vue'
import { Model } from 'vue-mc'
import Request from './Request'

export default class BaseModel extends Model {
    createRequest(config) {
        return new Request(config, Vue.prototype.$nuxt.$axios)
    }

    options() {
        return {
            useFirstErrorOnly: true,
            methods: {
                fetch: 'GET',
                save: 'POST',
                update: 'PUT',
                create: 'POST',
                patch: 'PATCH',
                delete: 'DELETE'
            }
        }
    }
}
