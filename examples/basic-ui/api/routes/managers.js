const express = require('express')
const managersData = require('../data/managers.json')
const { Manager, Managers } = require('../data/managers.js')

const managersCollection = new Managers(managersData)

const managers = express.Router()

function getError(message, status, errors = null) {
    const error = new Error(message)
    error.status = status
    error.errors = errors
    return error
}

function sendError(res, error) {
    res.status(error.status || 500).json({
        message: error.message,
        success: false,
        data: { error: JSON.stringify(error) }
    })
}

managers.use(
    express.urlencoded({
        extended: false,
        type: ['application/x-www-form-urlencoded', 'application/json']
    })
)

managers.get('/', function(req, res) {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 15
    const search = req.query.search || ''
    let data = managersCollection

    if (search.length) {
        data = managersCollection.filter(
            mng =>
                mng.first_name.toLowerCase().indexOf(search.toLowerCase()) > -1
        )
    }

    setTimeout(() => {
        res.json({
            data: data.models.slice((page - 1) * limit, page * limit),
            meta: {
                total: data.models.length,
                per_page: limit
            }
        })
    }, 250)
})

managers.get('/:id', function(req, res) {
    try {
        const id = Number(req.params.id)

        const manager = managersCollection.find({ id })

        if (!id || !manager) {
            throw getError('Manager not found', 404)
        }

        setTimeout(() => {
            res.json({ data: manager })
        }, 250)
    } catch (e) {
        sendError(res, e)
    }
})

managers.post('/', function(req, res) {
    try {
        // wierd transformation for array in the root
        const models = JSON.parse(Object.keys(req.body)[0])

        managersCollection.replace(models)

        res.json(models)
    } catch (e) {
        sendError(res, e)
    }
})

managers.post('/:id', function(req, res) {
    try {
        const id = Number(req.params.id)
        const fields = { ...req.body }

        const manager = managersCollection.find({ id })

        if (!id || !manager) {
            throw getError('Manager not found', 404)
        }

        // validate
        for (let field in fields) {
            manager.set(field, fields[field])
        }

        setTimeout(() => {
            res.json({ data: manager })
        }, 250)
    } catch (e) {
        sendError(res, e)
    }
})

managers.post('/add', async function(req, res) {
    try {
        const id = Math.max(...managersCollection.map('id')) + 1
        const manager = new Manager({ id, ...req.body })

        await manager.validate()

        managersCollection.add(manager)

        setTimeout(() => {
            res.json({ success: true, data: { id } })
        }, 250)
    } catch (e) {
        sendError(res, e)
    }
})

managers.get('/remove/:id', function(req, res) {
    try {
        const id = Number(req.params.id)

        const manager = managersCollection.find({ id })

        if (!id || !manager) {
            throw getError('Manager not found', 404)
        }

        managersCollection.remove(manager)

        setTimeout(() => {
            res.json({ data: { success: true, id } })
        }, 250)
    } catch (e) {
        sendError(res, e)
    }
})

module.exports = managers
