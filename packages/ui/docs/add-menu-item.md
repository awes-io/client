# Adding menu item to default layout in Awes.io

Menu is stored in `awesIo` module of Vuex store. Thus other modules can easily modify menu items. To modify menu manually, follow the next steps.

## 1. Create a plugin

file: */plugins/my-menu.js*
```javascript
export default function({ store, app }) {
    // adding menu item with child element
    store.commit('awesIo/SET_MENU_ITEM', {
        key: 'dashboard',
        order: 10,
        props: {
            text: app.i18n.t('dashboard'),
            href: '/',
            icon: 'dashboard'
        },
        children: [
            {
                order: 10,
                props: {
                    text: app.i18n.t('overview'),
                    href: '/overview'
                }
            }
        ]
    })

    // adding child elements
    store.commit('awesIo/SET_MENU_ITEM', [
        {
            parent: 'dashboard',
            order: 5,
            props: {
                text: app.i18n.t('statistic'),
                href: '/stats'
            }
        },
        {
            parent: 'managers',
            order: 20,
            props: {
                text: app.i18n.t('list'),
                href: '/list'
            }
        }
    ])
}
```

## 2. Include plugin in Nuxt.js config

file: */nuxt.config.js*
```javascript
export default {
    // ...

    plugins: ['~/plugins/my-menu']

    // ...
}
```

## SET_MENU_ITEM mutation

| Prop     | Type     | Description                        |
|----------|----------|------------------------------------|
| key      | `String` | **Required.** This props represents menu item id |
| order    | `Number` | Sorting priority. Lower value is higher in the list |
| props    | `Object` | Should contain props for menu item |
| children | `Array`  | May contain menu children          |
| parent   | `String` | May contain parent menu item key   |
