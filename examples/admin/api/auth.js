import { Router, json } from 'express'
import _ from 'lodash'

const route = Router()

route.use(json())

let USER = null

const SOCIAL_SECRET = '1234'

const TWO_FACTOR_SECRET = '123456'

const DB = [
    {
        id: 1,
        name: 'User Local',
        email: 'test@mail.com',
        password: '12345678',
        profile: {
            first_name: 'User',
            last_name: 'One'
        },
        needVerify: false,
        role: 'user'
    },
    {
        id: 2,
        name: 'User Social Twofactor',
        email: 'qwe@qwe.ru',
        password: 'qweqweqwe',
        profile: {
            first_name: 'User',
            last_name: 'Social Twofactor'
        },
        needVerify: true,
        role: 'admin'
    }
]

/* User data */

route.get('/me', (req, res) => {
    const header = req.get('Authorization')

    // console.log('/me: ', header)

    switch (header) {
        case 'Bearer local-token':
            USER = _.omit(DB[0], ['password'])
            break
        case 'Bearer social-token':
        case 'Bearer twofactor-token':
            USER = _.omit(DB[1], ['password'])
            break
        case 'Bearer non-verified':
            return res.status(403).json({
                data: {
                    message: 'Verification required'
                }
            })
        default:
            USER = null
            break
    }

    if (USER) {
        res.json({ data: USER })
    } else {
        res.status(401).json({ data: { message: 'Unauthenticated' } })
    }
})

/* Email and password mock */

route.post('/login', (req, res) => {
    const { email, password } = req.body
    const user = DB.find(
        user => user.email === email && user.password === password
    )

    if (user && !user.needVerify) {
        USER = _.omit(user, ['password'])
        res.json({
            data: {
                message: 'ok'
            },
            meta: {
                token: 'local-token'
            }
        })
    } else if (user && user.needVerify) {
        res.status(403).json({
            data: {
                message: 'Verification required'
            },
            meta: {
                token: 'non-verified'
            }
        })
    } else {
        res.status(422).json({
            data: {
                message: 'Invalid',
                errors: {
                    email: 'Email do not match',
                    password: 'Password do not match'
                }
            }
        })
    }
})

/* Social login mock */

route.get('/login/:service', (req, res) => {
    res.json({
        url: `/fake-auth/${req.params.service}/?social_secret=${SOCIAL_SECRET}`
    })
})

route.get('/login/:service/callback', (req, res) => {
    if (req.query.social_secret === SOCIAL_SECRET) {
        USER = _.omit(DB[1], ['password'])
        res.json({
            data: USER,
            meta: {
                token: 'social-token'
            }
        })
    } else {
        res.status(401).json({ data: { message: 'Unauthenticated' } })
    }
})

/* Two factor mock */

route.post('/login/twofactor/verify', (req, res) => {
    if (req.body.token === TWO_FACTOR_SECRET) {
        USER = _.omit(DB[1], ['password'])
        res.json({
            meta: { token: 'twofactor-token' }
        })
    } else {
        res.status(422).json({
            data: {
                message: 'Invalid',
                errors: {
                    token: 'Invalid token'
                }
            }
        })
    }
})

/* Logout */

route.post('/logout', (req, res) => {
    USER = null
    res.json({ data: { message: 'ok' } })
})

export default route
