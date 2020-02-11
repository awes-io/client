import { pathOr, mergeDeep } from 'rambdax'
import { Router, urlencoded } from 'express'
import {
    LOCALES,
    LOCALE_DEFAULT,
    LOCALES_FLAT,
    sortFn
} from '../data/translations'

const localeDefault = LOCALES[LOCALE_DEFAULT]

const findIndex = (value, param = 'id') =>
    LOCALES_FLAT.findIndex(item => item[param] === value)

let maxId = Math.max(...LOCALES_FLAT.map(({ id }) => id))

const route = Router()

route.use(
    urlencoded({
        extended: false,
        type: ['application/x-www-form-urlencoded', 'application/json']
    })
)

route.get('/', (req, res) => {
    const locale = req.query.locale || LOCALE_DEFAULT

    const translation = pathOr({}, locale, LOCALES)

    res.json({
        data: mergeDeep(localeDefault, translation)
    })
})

route.get('/edit', (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 15

    res.json({
        success: true,
        data: LOCALES_FLAT.slice((page - 1) * limit, page * limit),
        meta: {
            total: LOCALES_FLAT.length,
            current_page: page,
            per_page: limit
        }
    })
})

route.post('/edit', (req, res) => {
    // wierd transformation for array in the root
    const { name, value } = JSON.parse(Object.keys(req.body)[0])
    const errors = {}

    if (!name) {
        errors.name = 'Name is required'
    }

    if (!value[LOCALE_DEFAULT]) {
        errors[`value.${LOCALE_DEFAULT}`] = 'Default locale is required'
    }

    if (findIndex(name, 'name') !== -1) {
        errors.name = 'Name already exists'
    }

    if (Object.keys(errors).length) {
        res.status(443).json({
            success: false,
            errors
        })
    } else {
        LOCALES_FLAT.push({ id: maxId++, name, value })
        LOCALES_FLAT.sort(sortFn)

        res.json({
            success: true,
            data: maxId
        })
    }
})

route.delete('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const index = findIndex(id)

    if (index === -1) {
        res.status(443).json({
            success: false,
            message: 'Translation not found'
        })
    } else {
        LOCALES_FLAT.splice(index, 1)

        setTimeout(() => {
            res.json({
                success: true
            })
        }, 1000)
    }
})

route.patch('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id)
    // wierd transformation for array in the root
    const item = JSON.parse(Object.keys(req.body)[0])

    const index = findIndex(id)

    if (index !== -1) {
        LOCALES_FLAT[index] = item
    }

    setTimeout(() => {
        res.json({
            success: true
        })
    }, 1000)
})

export default route
