import express from 'express'
import { omit } from 'rambdax'
import USERS from './users'

const app = express()

let USER

app.post('/login', express.json(), (req, res) => {
    const { email, password } = req.body

    USER = USERS.find(
        user => user.email === email && user.password === password
    )

    if (USER) {
        return res.json(USER)
    }

    res.status(422).json({
        errors: {
            email: ['These credentials do not match our records.']
        }
    })
})

app.post('/logout', (req, res) => {
    USER = null

    res.end()
})

app.get('/me', (req, res) => {
    if (USER) {
        return res.json({
            data: omit('password', USER)
        })
    }

    res.status(401).end()
})

export default {
    handler: app,
    path: '/api'
}
