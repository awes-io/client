# Date convertation module for Awes.io

Based on [dayjs](https://github.com/iamkun/dayjs/)

## Basic usage

1. Install module `yarn add @awes-io/dayjs`
2. Now you are ready to use it

By default, the module will parse `i18n.locales` in `nuxt.config.js` to load additional localization

```html
<template>
    <div>
        {{ $dayjs(new Date()).format('DD/MM/YYYY') }}
    </div>
</template>
```

```javascript
export default {
    data() {
        return {
            date: new Date()
        }
    },

    computed: {
        formatted() {
            return this.$dayjs(this.date).format('HH:mm:ss')
        }
    }
}
```

3. Additional configuration

```javascript
// nuxt.config.js

export default {
    modules: ['@awes-io/dayjs'],
    awesIo: {
        // default configuration
        dayjs: {
            stringFormat: {
                pattern: null,
                format: true
            },
            plugins: [
                'dayjs/plugin/customParseFormat',
                'dayjs/plugin/localizedFormat'
            ]
        }
    }
}
```

You may provide default format for parsing and formatting string dates, like this:

```javascript
export default {
    awesIo: {
        dayjs: {
            // parse and format...
            stringFormat: 'YYYY-MM-DD[T]HH:mm:ssZZ'

            // ...or parsing only
            // stringFormat: {
            //     pattern: 'YYYY-MM-DD[T]HH:mm:ssZZ',
            //     format: false
            // }
        }
    }
}
```

To add more plugins, pass an array to `plugins` property, they will be merged with defaults

```javascript
export default {
    awesIo: {
        dayjs: {
            plugins: [
                'dayjs/plugin/relativeTime',
                { src: '~/assets/js/my-plugin', options: { something: true } }
            ]
        }
    }
}
```

Ensure to write proper commit message according to [Git Commit convention](https://www.conventionalcommits.org/)
