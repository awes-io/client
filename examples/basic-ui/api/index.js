const express = require('express')
const tasks = require('./routes/tasks')
const managers = require('./routes/managers')

const app = express()

app.use(express.static(__dirname + '/static'))
app.use(tasks)
app.use('/managers', managers)

module.exports = {
    path: '/api',
    handler: app
}
