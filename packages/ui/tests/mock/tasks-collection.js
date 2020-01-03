import { Model, Collection } from 'vue-mc'
import V from 'vue-mc/validation'

/**
 * Task model
 */
class Task extends Model {
    // Default attributes that define the "empty" state.
    defaults() {
        return {
            id: null,
            name: '',
            done: false
        }
    }

    // Attribute mutations.
    mutations() {
        return {
            id: id => Number(id),
            name: String,
            done: Boolean
        }
    }

    // Attribute validation
    validation() {
        return {
            id: V.integer.and(V.min(1)),
            name: V.string.and(V.required),
            done: V.boolean
        }
    }

    // Route configuration
    routes() {
        return {
            fetch: '/api/task/{id}',
            save: '/api/task'
        }
    }
}

/**
 * Task collection
 */
class TaskList extends Collection {
    // Model that is contained in this collection.
    model() {
        return Task
    }

    // Default attributes
    defaults() {
        return {
            orderBy: 'name',
            total: 0
        }
    }

    // Route configuration
    routes() {
        return {
            fetch: '/api/tasks'
        }
    }

    // Number of tasks to be completed.
    get todo() {
        return this.sum('done')
    }

    // Will be `true` if all tasks have been completed.
    get done() {
        return this.todo == 0
    }

    getModelsFromResponse(response) {
        return response.getData().data
    }
}

// Create a new empty task list.
let tasks = new TaskList() // (models, options)

tasks.on('fetch', event => {
    console.log(event)
})

// tasks.add(TASKS)

export default tasks
