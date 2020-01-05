const express = require('express')

const app = express()

const tasks = require('./routes/tasks')

app.use(tasks)

module.exports = {
    path: '/api',
    handler: app
}
