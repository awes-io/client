import express from 'express'
import auth from './auth'

const app = express()

app.use(auth)

export default {
    handler: app,
    path: '/api'
}
