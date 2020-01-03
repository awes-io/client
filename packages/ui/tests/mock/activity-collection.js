import { Model, Collection } from 'vue-mc'
import V from 'vue-mc/validation'

/**
 * Activity model
 */
class Activity extends Model {
    defaults() {
        return {
            title: '',
            subtitle: '',
            author: {},
            createdAt: null
        }
    }

    mutations() {
        return {
            title: String,
            subtitle: String,
            author: Object,
            createdAt: String
        }
    }

    validation() {
        return {
            title: V.string,
            subtitle: V.string,
            author: V.object,
            createdAt: V.string
        }
    }
}

/**
 * Activity collection
 */
class ActivityList extends Collection {
    model() {
        return Activity
    }

    routes() {
        return {
            fetch: '/api/activity'
        }
    }

    getModelsFromResponse(response) {
        return response.getData().data
    }
}

let activity = new ActivityList()

activity.on('fetch', event => {
    console.log(event)
})

export default activity
