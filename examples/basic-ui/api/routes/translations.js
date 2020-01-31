const express = require('express')
const lang = require('../data/translations.js')

const translations = express.Router()

translations.get('/', (req, res) => {
    const locale = req.query.lang || 'en'
    const translations = lang[locale] || lang['en']

    res.json({
        data: translations
    })
})

module.exports = translations
