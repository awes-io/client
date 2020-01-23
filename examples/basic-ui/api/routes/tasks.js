const { Router } = require('express')
const tasksData = require('../../tests/mock/tasks.json')

const router = Router()

router.get('/tasks', function(req, res) {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 15

    setTimeout(() => {
        res.json({
            data: tasksData.slice((page - 1) * limit, page * limit),
            meta: {
                total: tasksData.length,
                per_page: limit
            }
        })
    }, 1000)
})

module.exports = router
