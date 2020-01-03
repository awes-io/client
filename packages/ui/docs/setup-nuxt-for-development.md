# Setting up Nuxt.js for development with Awes.io UI

## 1. Install @awes-io/ui

```bash
$ yarn add @awes-io/ui
```

include module in *nuxt.config.js*

```javascript
export default {
    // ...
    modules: [
        // ...
        '@awes-io/ui/nuxt'
    ]
}
```

## 2. Install @nuxtjs/tailwindcss module

add dependency

```bash
$ yarn add -D @nuxtjs/tailwindcss
```

include module in *nuxt.config.js*

```javascript
export default {
    // ...
    buildModules: [
        // ...
        '@nuxtjs/tailwindcss'
    ]
}
```

## 3. Include @awes-io/ui tailwind.config.js

tailwind.config.js in the project's root folder

```javascript
const awesIoConfig = require('@awes-io/ui/tailwind.config.js')

module.exports = {
    ...awesIoConfig
    // your config here
}
```

## 4. Install postcss-plugins and other modules for development

```bash
$ yarn add -D postcss-assets postcss-each postcss-easings postcss-simple-vars chroma-js
```

Extend your *nuxt.config.js*

```javascript
import path from 'path'

export default {
    // add fonts (if needed)
    head: {
        // ...
        link: [
            // ...
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Open+Sans:400,700|Ubuntu:400,500&display=swap'
            }
        ]
    },

    // ...
    build: {
        // ...
        postcss: {
            plugins: {
                'postcss-nested': {},
                'postcss-assets': {
                    loadPaths: [
                        // include assets loading folder
                        path.resolve(
                            __dirname,
                            './node_modules/@awes-io/ui/src/assets/img'
                        )
                    ]
                },
                'postcss-each': {},
                'postcss-simple-vars': {},
                'postcss-easings': {},
                'postcss-custom-properties': {}
            }
        }
    },

    // add page default transition (if needed)
    pageTransition: {
        name: 'fade',
        mode: 'out-in'
    },

    // disable CSS loading from module
    awesIo: {
        ui: {
            addCss: false
        }
    }
}
```

Extend your tailwindcss entry file */assets/css/tailwind.css*

```css
/* Include variables in the begining */
@import '@awes-io/ui/src/assets/css/variables.css';

/* ... */

/**
 * Include after tailwind components, and before utilities
 * All, or choose components you need
 */
@import '@awes-io/ui/src/assets/css/components/_index.css';

/* Load iconic font */
@import '@awes-io/ui/nuxt/icons.css';
```

## 5. Install nuxt-i18n module

```bash
$ yarn add nuxt-i18n
```

include module in *nuxt.config.js*

```javascript
export default {
    // ...
    modules: [
        // ...
        'nuxt-i18n'
    ],

    // ...
    i18n: {
        vueI18n: {
            // `@awes-io/ui` will register lang strings under `en` locale
            fallbackLocale: 'en'
        },
        locales: [{ code: 'en', iso: 'en-US' }],
        defaultLocale: 'en'
    }
}
```

## 6. You are ready to go!

```bash
$ yarn dev
```
