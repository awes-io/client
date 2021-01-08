import { navigation } from '../config/navigation'

export default function({ store }) {
    const menuItems = {
        examples: {
            order: 0,
            text: 'Examples',
            href: '/',
            icon: 'university',
            children: [
                {
                    text: 'Examples',
                    href: '/'
                }
            ]
        },
        dashboard: {
            order: 1,
            text: 'Dashboard',
            icon: 'plus-circle',
            children: []
        },
        table: {
            order: 1,
            text: 'Table',
            icon: 'duotone/list-alt',
            children: []
        }
    }

    for (var i = 0; i < navigation.length; i++) {
        const item = navigation[i]
        const href = item.url

        let children = []

        if (Array.isArray(navigation[i].children)) {
            children = navigation[i].children.map((child) => ({
                text: child.title,
                href: child.url
            }))
        }

        if (href.startsWith('/dashboard')) {
            menuItems.dashboard.children.push({
                text: item.title,
                href,
                children
            })
            continue
        }

        if (href.startsWith('/table')) {
            menuItems.table.children.push({
                text: item.title,
                href,
                children
            })
            continue
        }

        menuItems.examples.children.push({
            text: item.title,
            href,
            children
        })
    }

    store.commit('awesIo/SET_MENU_ITEMS', menuItems)

    // mock user menu
    store.commit('awesIo/SET_USER_MENU_ITEM', {
        key: 'mock',
        order: 1,
        item: {
            component: 'AwLink',
            props: {
                text: 'Homepage',
                href: '/'
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
