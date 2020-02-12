# Awes.io module for editing translations

This module is an interface, that helps you to edit translations in your database.

## Basic usage

1. Make shure, you are using `@awes-io/ui` and `@nuxtjs/axios`
2. Install the module `yarn add @awes-io/nuxt-localization`
3. The frontend part is ready!

## Backend endpoint

By default, the module will make next requests to you backend

### Fetch translations to edit

```json
// GET /api/translations/edit?page={page}&limit={limit}&search={search}

// Expected response
{
    "data": [
        // array of translations: id, name and value
        {
            "id": 1,
            "name": "ui.hello",
            "value": {
                "en": "Hello",
                "de": "Hallo"
            }
        },
        {
            "id": 1,
            "name": "another.translation.key",
            "value": {
                "en": "Another translation key"
                // locales may be missing
            }
        },
        // ...
    ],
    "meta": {
        current_page: 1, // required
        per_page: 15, // required
        total: 42, // required
        // ...
    }
}
```

### Add new translation

```json
// POST /api/translations/edit

// Request body
{
    "name": "ui.hello",
    "value": {
        "en": "Hello",
        "de": "Hallo"
        // ... other languages in current project
    }
}

// Expected response - status 200

// Error response - status !== 200

{
    "errors": {
        "name": "Key already exists",
        "value.en": "Default translation is required"
    }
}
```

### Save edited translation

```json
// PATCH /api/translations/edit/{id}

// Request body
{
    "id": 1,
    "name": "ui.hello",
    "value": {
        "en": "Hello",
        "de": "Hallo",
        "ru": "Привет"
    }
}

// Expected response - status 200
```

### Delete translation

```json
// DELETE /api/translations/edit/{id}

// Expected response - status 200
```

## Configuration

```javascript
// nuxt.config.js

{
    awesIo: {
        nuxtLoaclization: {
            // the localization base route, attached to project
            route: '/localization',

            // backend endpoint
            endpoint: '/api/translations/edit',

            // if string is longer, then this limit it will be rendered as textarea
            textLimit: 128,

            // name of data field in response
            data: {
                default: {},
                response: 'data'
            },

            // name of errors field in response
            errors: {
                default: {},
                response: 'errors'
            },

            // pagination request params and response field names
            pagination: {
                page: {
                    default: 1,
                    request: 'page',
                    response: 'meta.current_page'
                },
                limit: {
                    default: 15,
                    request: 'limit',
                    response: 'meta.per_page'
                },
                total: {
                    response: 'meta.total'
                }
            },

            // search request params
            search: { request: 'search' }
        }
    }
}
```
Ensure to write proper commit message according to [Git Commit convention](https://www.conventionalcommits.org/)
