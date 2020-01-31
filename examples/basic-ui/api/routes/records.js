const express = require('express')
const recordsData = require('../data/records.json')

const records = express.Router()

records.get('/', function(req, res) {
    setTimeout(() => {
        res.json({
            data: recordsData
        })
    }, 250)
})

module.exports = records
