import { navigation } from '../config/navigation'

export default function({ store }) {
    const menuItems = [
        {
            text: 'Awes.io UI v3',
            icon: 'university',
            children: [
                {
                    text: 'Components',
                    href: '/overview'
                }
            ]
        },
        {
            text: 'Table',
            icon: 'duotone/list-alt',
            children: []
        }
    ]

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

        if (href.startsWith('/table')) {
            menuItems[1].children.push({
                text: item.title,
                href,
                children
            })
            continue
        }

        menuItems[0].children.push({
            text: item.title,
            href,
            children
        })
    }

    store.commit('awesIo/SET_MENU_ITEMS', { main: menuItems })
}
