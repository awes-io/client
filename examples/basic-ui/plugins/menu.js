import { navigation } from '../config/navigation'
import { urlify } from '~/assets/js/url'

export default function({ store }) {
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
        const href = `/${key}`

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
}
