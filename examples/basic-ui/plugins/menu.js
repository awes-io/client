import { navigation } from '../config/navigation'
import { urlify } from '~/assets/js/url'

export default function({ store, app }) {
    const menuItems = [
        {
            key: 'examples',
            order: 0,
            dropdown: true,
            icon: false,
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
                    text: child.title,
                    href: child.url,
                    badge: child.badge
                }
            }))
        }

        menuItems.push({
            key,
            dropdown: i > 2,
            props: {
                text: item.title,
                href,
                badge: item.badge,
                icon: item.icon
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
    // store.commit('awesIo/SET_NAVBAR_ITEM', [
    //     {
    //         key: 'icon1',
    //         order: 1,
    //         item: {
    //             component: 'AwIcon',
    //             props: {
    //                 name: 'speaker',
    //                 class: 'lg:text-surface',
    //                 size: 'xl'
    //             }
    //         }
    //     },
    //     {
    //         key: 'icon2',
    //         order: 2,
    //         item: {
    //             component: 'AwIcon',
    //             props: {
    //                 name: 'location',
    //                 class: 'lg:text-surface',
    //                 size: 'xl'
    //             }
    //         }
    //     }
    // ])
}
