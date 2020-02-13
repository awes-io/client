# Awes.io module for connection with Laravel backend

## Basic usage

### Folders structure

```
\
-- app
-- bootstrap
-- config
-- ...other Laravel folders
-- resources /
---- nuxt
------ assets
------ components
------ ... other Nuxt folders
-- nuxt.config.js
-- package.json
```

Place Nuxt project into `resources/nuxt` folder, except `nuxt.config.js` and `package.json`. Place last mentioned files in the root of your project.

### Follow next steps

1. Ensure you have `@awes-io/laravel-nuxt` in your `composer.json`
2. Install the module `yarn add @awes-io/nuxt-laravel`
3. Modify `nuxt.config.js`

```javascript
// nuxt.config.js

export default {
    mode: 'spa',

    srcDir: 'resources/nuxt',

    modules: [
        '@awes-io/nuxt-laravel' // include first
        // other nuxt modules
    ]
}
```

4. Add scripts in your `package.json`

```json
// package.json

{
    "scripts": {
        "dev": "LARAVEL_URL=http://path.to.dev.laravel nuxt",
        "build": "LARAVEL_URL=http://path.to.prod.laravel nuxt build",
        "generate": "LARAVEL_URL=http://path.to.prod.laravel nuxt generate",
        "start": "LARAVEL_URL=http://path.to.prod.laravel nuxt start"
    }
}
```

5. All done!

## How the module works

This module will do the next steps:

1. Add [@nuxtjs/axios](https://axios.nuxtjs.org/) module
2. Proxy requests on `/api/` route to your laravel backend
3. Move built files to `public` path on `nuxt generate` command and create `index.html` for SPA entry point

Ensure to write proper commit message according to [Git Commit convention](https://www.conventionalcommits.org/)
