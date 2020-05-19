const express = require('express')
const { path, handler } = require('./index')

const app = express()

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

app.use(path, handler)

app.listen(3030)
