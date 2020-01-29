import { Response as VueMCResponse } from 'vue-mc'
import { pathOr } from 'rambdax'

export default class Response extends VueMCResponse {
    getData() {
        return pathOr(null, 'data.data', this.response)
    }

    getValidationErrors() {
        return pathOr(null, 'data.errors', this.response)
    }
}
