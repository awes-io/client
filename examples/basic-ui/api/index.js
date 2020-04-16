const express = require('express')
const chart = require('./routes/chart')
const managers = require('./routes/managers')
const records = require('./routes/records')
const gallery = require('./routes/gallery')

const app = express()

app.use(express.static(__dirname + '/static'))
app.use(chart)
app.use('/managers', managers)
app.use('/records', records)
app.use('/gallery', gallery)

module.exports = {
    path: '/api',
    handler: app
}
