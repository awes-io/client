import { Request as VueMCRequest } from 'vue-mc'
import Response from './Response'

export default class Request extends VueMCRequest {
    constructor(config, axios) {
        super(config)
        this.axios = axios
    }

    createResponse(axiosResponse) {
        return new Response(axiosResponse)
    }

    send() {
        return this.axios
            .request(this.config)
            .then(this.createResponse)
            .catch(error => {
                throw this.createError(error)
            })
    }
}
