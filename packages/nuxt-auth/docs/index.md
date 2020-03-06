# NuxtAuth

## Protect the page

If you would like to close the page under auth.

**Setting per route:**
```vue
export default {
  middleware: 'auth'
}
```

**Globally setting in `nuxt.config.js`:**
```vue
router: {
  middleware: ['auth']
}
```

## Disable auth module on the page

**At the page:**
```vue
export default {
  auth: false
}
```

or:
```vue
export default {
  auth: 'guest'
}
```
