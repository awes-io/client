import express from 'express'
import translations from './routes/translations'

const app = express()

app.use('/translations', translations)

export default {
    path: '/api',
    handler: app
}
