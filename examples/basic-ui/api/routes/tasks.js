const querystring = require('querystring')
const { Router } = require('express')
const tasksData = require('../../tests/mock/tasks.json')

const router = Router()

router.get('/tasks', function(req, res) {
    const query = querystring.parse(req._parsedUrl.query)
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 15

    setTimeout(() => {
        res.setHeader('Content-Type', 'application/json')
        res.end(
            JSON.stringify({
                data: tasksData.slice((page - 1) * limit, page * limit),
                meta: {
                    total: tasksData.length
                }
            })
        )
    }, 1000)
})

module.exports = router
