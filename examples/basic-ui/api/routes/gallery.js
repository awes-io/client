const fs = require('fs')
const path = require('path')
const { isEmpty, isNil, values, startsWith } = require('rambdax')
const express = require('express')
const fileUpload = require('express-fileupload')
const route = express.Router()

const UPLOAD_DIR = path.join(__dirname, '../static/tmp')
const UPLOAD_DIR_URL = '/api/tmp/'

let main = null

function getUploadedName(fileName) {
    return path.join(UPLOAD_DIR_URL, fileName)
}

function getFilePathFromUrl(url) {
    const file = url.replace(UPLOAD_DIR_URL, '')
    return path.join(UPLOAD_DIR, file)
}

route.use(fileUpload())

route.get('/', (req, res) => {
    if (fs.existsSync(UPLOAD_DIR)) {
        const files = fs.readdirSync(UPLOAD_DIR)
        const fileUrls = files.map(getUploadedName)

        res.json({
            data: {
                files: fileUrls,
                main: main || fileUrls[0]
            }
        })
    } else {
        res.json({
            data: {
                files: [],
                main: null
            }
        })
    }
})

route.get('/set-main', (req, res) => {
    const fileUrl = req.query.image
    const filePath = getFilePathFromUrl(fileUrl)

    if (!fs.existsSync(filePath)) {
        return res.status(400).json({ message: `File ${fileUrl} not found` })
    }

    main = fileUrl

    res.end()
})

route.post('/upload', (req, res) => {
    if (isNil(req.files) || isEmpty(req.files)) {
        return res.status(400).json({
            message: 'No files were uploaded.'
        })
    }

    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true }, error => {
            if (error) {
                return res.status(500).json({
                    message: 'Server error',
                    error
                })
            }
        })
    }

    values(req.files).forEach(({ mimetype, name, mv }) => {
        if (!startsWith('image/', mimetype)) {
            return res.status(422).json({
                message: 'Invalid data',
                errors: [`${name} is not an image`]
            })
        }

        const extension = name.split('.').pop() || 'jpg'
        const _name = `upload-${new Date().getTime()}.${extension}`

        mv(path.join(UPLOAD_DIR, _name), error => {
            if (error) {
                return res.status(500).json({
                    message: 'Server error',
                    error
                })
            }

            res.json({
                data: {
                    image: getUploadedName(_name)
                }
            })
        })
    })
})

route.get('/delete', (req, res) => {
    const fileUrl = req.query.image
    const filePath = getFilePathFromUrl(fileUrl)

    if (!fs.existsSync(filePath)) {
        return res.status(400).json({ message: `File ${fileUrl} not found` })
    }

    if (fileUrl === main) {
        const files = fs.readdirSync(UPLOAD_DIR)
        main = files.length ? getUploadedName(files[0]) : null
    }

    fs.unlink(filePath, error => {
        if (error) {
            res.status(500).json({
                message: 'Server error',
                error
            })
        } else {
            res.json({ data: { main } })
        }
    })
})

module.exports = route
