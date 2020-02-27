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

    // mock user menu additional
    store.commit('awesIo/SET_USER_MENU_ADDITIONAL_ITEM', {
        key: 'darkTheme',
        order: 1,
        item: {
            component: 'AwSwitcher',
            listeners: {
                change: e => {
                    console.log('click switcher dark', e)
                }
            },
            props: {
                label: 'Dark theme',
                checked: true
            }
        }
    })

    store.commit('awesIo/SET_USER_MENU_ADDITIONAL_ITEM', {
        key: 'kioskMode',
        order: 1,
        item: {
            component: 'AwSwitcher',
            listeners: {
                change: e => {
                    console.log('click kiosk mode', e)
                }
            },
            props: {
                label: 'Kiosk mode',
                checked: false
            }
        }
    })
}
