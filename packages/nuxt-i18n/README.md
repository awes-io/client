# Awes.io Models and Collections abstract layer

Based on [nuxt-i18n](https://nuxt-community.github.io/nuxt-i18n/)

This modules fetches translations into your Nuxj.js project from the given endpoint, and provides automatic `nuxt-i18n` configuration.

## Basic usage

1. Install the module `yarn add @awes-io/nuxt-i18n`
2. Write basic config

```javascript
// nuxt.config.js

export default {
    modules: ['@awes-io/nuxt-i18n'],

    awesIo: {
        nuxtI18n: {
            locales: [
                { code: 'de-DE', domain: 'site.de' },
                { code: 'en-GB', domain: 'site.uk' }
            ]
            // for same domain it could be even shorter: ['de-DE', 'en-GB']
        }
    }
}
```

**That's it!**

## This minimal config will do the following:

1. Generate [extended config](https://nuxt-community.github.io/nuxt-i18n/options-reference.html) for `nuxt-i18n`

```javascript
// nuxt.config.js

export default {
    i18n: {
        defaultLocale: 'de', // first in array
        locales: [
            {
                code: 'de',
                iso: 'de-DE',
                domain: 'site.de',
                file: '/translations-de.js' // auto-generated file
            },
            {
                code: 'en',
                iso: 'en-GB',
                domain: 'site.uk',
                file: '/translations-en.js' // auto-generated file
            }
        ],
        differentDomains: true,
        langDir: '.nuxt/awes-io/lang'
    }
}
```

2. Generate file with code like this *(this is simplified version)* for each locale:

```javascript
import axios from 'axios'

export default function() {
    return new Promise(resolve => {
        axios
            .get('/api/translations?locale={locale}')
            .then(({ data }) => resolve(data.data))
            .catch(e => {
                console.log(e)
                resolve({})
            })
    })
}
```

## Server response

By default, your server response should look like this:

```json
// GET /api/translations?locale=de

{
    "data": {
        "hello": "Hallo",
        "goodbye": "Auf Wiedersehen"
    }
}

// GET /api/translations?locale=en

{
    "data": {
        "hello": "Hallo", // no translation - fallback to default language
        "goodbye": "Goodbye"
    }
}
```

And you can use it in templates:

```html
<template>
    <div>{{ $t('hello') }}</div>
</template>
```

### Configuring server endpoint

Extend your basic config like this

```javascript
// nuxt.config.js

export default {
    i18n: {
        vueI18n: {
            fallbackLocale: 'de' // this will force to make additional request for default locale
        }
    },

    awesIo: {
        nuxtI18n: {
            url: '/api/langs/{locale}', // insert {locale} for locale code interpolation
            dataPath: 'my.lang' // set to 'false' for data without "wrapper", 'data' by default
            // ... some other config
        }
    }
}
```

The response should look like this:

```json
// GET /api/langs/de

{
    "my": {
        "lang": {
            "hello": "Hallo",
            "goodbye": "Auf Wiedersehen"
        }
    }
}

// GET /api/langs/en

{
    "my": {
        "lang": {
            // no translation - no key in response
            "goodbye": "Goodbye"
        }
    }
}
```

> #### Note!
> If you provide `url` with different domain, like this `'https://another-site.io/api/langs/{locale}'`,
> be shure, to send `Access-Control-Allow-Origin` header and support `HEAD` request method

Ensure to write proper commit message according to [Git Commit convention](https://www.conventionalcommits.org/)
