export class ListModel {
    constructor(
        url,
        requestProvider,
        errorHandler = e => {
            console.log(e)
        }
    ) {
        this.url = url
        this.requestProvider = requestProvider
        this.errorHandler = errorHandler
    }

    list(params) {
        return this.request({ method: 'get', params })
    }

    find(id) {
        return this.request({ method: 'get', url: `${this.url}/${id}` })
    }

    create(data) {
        return this.request({ method: 'post', data })
    }

    update(id, data) {
        return this.request({ method: 'put', url: `${this.url}/${id}`, data })
    }

    delete(id) {
        return this.request({ method: 'delete', url: `${this.url}/${id}` })
    }

    request(options) {
        return this.requestProvider({ url: this.url, ...options })
            .then(({ data }) => data)
            .catch(this.errorHandler)
    }
}
