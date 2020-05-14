import { navigation } from '../config/navigation'
import { urlify } from '~/assets/js/url'

export default function({ store, app }) {
    const menuItems = [
        {
            key: 'examples',
            order: 0,
            props: {
                text: 'Examples',
                href: '/',
                icon: 'settings'
            }
        }
    ]

    for (var i = 0; i < navigation.length; i++) {
        const item = navigation[i]
        const key = urlify(item.title)
        const href = item.url

        let children

        if (Array.isArray(navigation[i].children)) {
            children = navigation[i].children.map(child => ({
                props: {
                    text: child,
                    href: `${href}/${urlify(child)}`
                }
            }))
        }

        menuItems.push({
            key,
            props: {
                text: item.title,
                href
            },
            children
        })
    }

    store.commit('awesIo/SET_MENU_ITEM', menuItems)

    // mock user menu
    store.commit('awesIo/SET_USER_MENU_ITEM', {
        key: 'mock',
        order: 1,
        item: {
            component: 'AwLink',
            props: {
                text: 'Homepage',
                href: app.localePath({ path: '/' }, app.i18n.locale)
            }
        }
    })

    //mock navbar/ Uncomment to enable navbar
    store.commit('awesIo/SET_NAVBAR_ITEM', [
        {
            key: 'link1',
            order: 1,
            item: {
                component: 'AwLink',
                text: 'Home',
                props: {
                    href: app.localePath({ path: '/' }, app.i18n.locale),
                    class: 'lg:text-surface'
                }
            }
        },
        {
            key: 'link2',
            order: 2,
            item: {
                component: 'AwLink',
                text: 'Accounting',
                props: {
                    href: app.localePath({ path: '/' }, app.i18n.locale),
                    class: 'lg:text-surface'
                }
            }
        },
        {
            key: 'link3',
            order: 3,
            item: {
                component: 'AwLink',
                text: 'Settings',
                props: {
                    href: app.localePath({ path: '/' }, app.i18n.locale),
                    class: 'lg:text-surface'
                }
            }
        }
    ])
}
