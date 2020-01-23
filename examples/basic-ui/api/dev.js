const express = require('express')
const { path, handler } = require('./index')

const app = express()

app.use(path, handler)

app.listen(3030)
