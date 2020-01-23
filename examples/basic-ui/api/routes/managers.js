const express = require('express')
const managersData = require('../data/managers.json')
const { Manager, Managers } = require('../data/managers.js')

const managersCollection = new Managers(managersData)

const managers = express.Router()

managers.use(express.urlencoded({ extended: false }))

managers.get('/', function(req, res) {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 15

    setTimeout(() => {
        res.json({
            data: managersCollection.models.slice(
                (page - 1) * limit,
                page * limit
            ),
            meta: {
                total: managersCollection.models.length,
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
            throw new Error('Manager not found')
        }

        setTimeout(() => {
            res.json({ data: manager })
        }, 250)
    } catch (error) {
        console.log(error)

        res.status(404).json({
            message: error.message,
            success: false,
            data: { error: JSON.stringify(error) }
        })
    }
})

managers.post('/:id', function(req, res) {
    try {
        const id = Number(req.params.id)
        const fields = { ...req.body }

        const manager = managersCollection.find({ id })

        if (!id || !manager) {
            throw new Error('Manager not found')
        }

        // validate
        for (let field in fields) {
            manager.set(field, fields[field])
        }

        setTimeout(() => {
            res.json({ data: manager })
        }, 250)
    } catch (error) {
        res.status(404).json({
            message: error.message,
            success: false,
            data: { error: JSON.stringify(error) }
        })
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
    } catch (error) {
        res.status(403).json({
            message: error.message,
            success: false,
            data: { error: JSON.stringify(error) }
        })
    }
})

managers.get('/remove/:id', function(req, res) {
    try {
        const id = Number(req.params.id)

        const manager = managersCollection.find({ id })

        if (!id || !manager) {
            throw new Error('Manager not found')
        }

        managersCollection.remove(manager)

        setTimeout(() => {
            res.json({ data: { success: true, id } })
        }, 250)
    } catch (error) {
        console.log(error)

        res.status(403).json({
            message: error.message,
            success: false,
            data: { error: JSON.stringify(error) }
        })
    }
})

module.exports = managers
