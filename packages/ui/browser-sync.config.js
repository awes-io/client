const fs = require('fs')
const _ = require('lodash')
const querystring = require('querystring')
const pages = fs.readdirSync('./pages')
const tasksData = require('./tests/mock/tasks.json')
const activityData = require('./tests/mock/activity.json')

const routes = {}

pages
    .filter(filename => /.vue$/.test(filename))
    .forEach(filename => {
        let route = `/${_.toLower(
            filename.replace('.vue', '').replace(/_/g, '/')
        )}`
        routes[route] = 'examples/index.html'
    })

module.exports = {
    ui: false,
    open: false,
    notify: false,
    server: {
        baseDir: ['./dist', './examples'],
        /*
         ** Rewrite all routes to index.html
         */
        routes
    },
    middleware: [
        {
            route: '/api/errors',
            handle: function(req, res) {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 422
                res.end(
                    JSON.stringify({
                        success: false,
                        message: 'The given data was invalid.',
                        errors: {
                            name: [
                                'This name is already in use.',
                                'The name field is required.'
                            ],
                            password: ['The password field is required.'],
                            'phones[0]phone': ['Some error', 'And one more...']
                        }
                    })
                )
            }
        },
        {
            route: '/api/tasks',
            handle: function(req, res) {
                const query = querystring.parse(req._parsedUrl.query)
                const page = Number(query.page) || 1
                const limit = Number(query.limit) || 15

                setTimeout(() => {
                    res.setHeader('Content-Type', 'application/json')
                    res.end(
                        JSON.stringify({
                            data: tasksData.slice(
                                (page - 1) * limit,
                                page * limit
                            ),
                            meta: {
                                total: tasksData.length
                            }
                        })
                    )
                }, 1000)
            }
        },
        {
            route: '/api/activity',
            handle: function(req, res) {
                const query = querystring.parse(req._parsedUrl.query)
                const page = Number(query.page) || 1
                const limit = 5

                setTimeout(() => {
                    res.setHeader('Content-Type', 'application/json')
                    res.end(
                        JSON.stringify({
                            data: activityData.slice(
                                (page - 1) * limit,
                                page * limit
                            )
                        })
                    )
                }, 1000)
            }
        },
        {
            route: '/api/select-ajax/add',
            handle: function(req, res) {
                let body = []

                req.on('error', err => {
                    res.setHeader('Content-Type', 'application/json')
                    res.statusCode = 500
                    res.end(
                        JSON.stringify({
                            success: false,
                            message: err.message
                        })
                    )
                })
                    .on('data', chunk => {
                        body.push(chunk)
                    })
                    .on('end', () => {
                        body = JSON.parse(Buffer.concat(body).toString())
                        const name = body.name
                        let id = tasksData[tasksData.length - 1].id + 1
                        tasksData.push({ id, name })
                        res.setHeader('Content-Type', 'application/json')
                        setTimeout(() => {
                            res.end(
                                JSON.stringify({
                                    data: { id, name }
                                })
                            )
                        }, 1000)
                    })
            }
        },
        {
            route: '/api/select-ajax',
            handle: function(req, res) {
                const query = querystring.parse(req._parsedUrl.query)
                const filterRE = new RegExp(query.s, 'i')
                const found = tasksData.filter(({ name }) =>
                    filterRE.test(name)
                )

                setTimeout(() => {
                    res.setHeader('Content-Type', 'application/json')
                    res.end(
                        JSON.stringify({
                            data: found
                        })
                    )
                }, 1000)
            }
        }
    ],
    watch: true
}
