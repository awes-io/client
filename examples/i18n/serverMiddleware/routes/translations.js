import { pathOr } from 'rambdax'
import { Router } from 'express'
import { LOCALES, LOCALE_DEFAULT } from '../data/translations'

const route = Router()

route.get('/', (req, res) => {
    const locale = req.query.locale || LOCALE_DEFAULT

    const translation = pathOr(LOCALES[LOCALE_DEFAULT], locale, LOCALES)

    res.json({
        data: translation
    })
})

export default route
