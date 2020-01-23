const { Model, Collection } = require('vue-mc')
const V = require('vue-mc/validation')

class Manager extends Model {
    defaults() {
        return {
            id: null,
            first_name: '',
            last_name: '',
            position: 'Employee',
            email: '',
            phones: []
        }
    }

    mutations() {
        return {
            id: id => Number(id),
            first_name: String,
            last_name: String,
            position: String,
            email: String,
            phones: phones =>
                Array.isArray(phones)
                    ? phones.filter(Boolean).map(String)
                    : phones
                    ? [String(phones)]
                    : []
        }
    }

    validation() {
        return {
            id: V.integer.and(V.min(1)),
            first_name: V.alpha.and(V.length(1, 128)).and(V.required),
            last_name: V.alpha.and(V.length(1, 128)).or(V.empty),
            position: V.alpha,
            email: V.email,
            phones: V.array
        }
    }

    // Route configuration
    routes() {
        return {
            fetch: 'api/managers/{id}',
            save: 'api/managers'
        }
    }
}

class Managers extends Collection {
    // Model that is contained in this collection.
    model() {
        return Manager
    }

    // Route configuration
    routes() {
        return {
            fetch: 'api/managers'
        }
    }
}

module.exports = { Manager, Managers }
