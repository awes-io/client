const { BaseModel, BaseCollection } = require('@awes-io/vue-mc')
const V = require('vue-mc/validation')

class Manager extends BaseModel {
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
            first_name: val => {
                return val ? String(val) : ''
            },
            last_name: val => {
                return val ? String(val) : ''
            },
            position: val => {
                return val ? String(val) : ''
            },
            email: val => {
                return val ? String(val) : ''
            },
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

class Managers extends BaseCollection {
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
