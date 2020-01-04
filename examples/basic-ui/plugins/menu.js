import { navigation } from '../config/navigation'

export default function({ store }) {
    // adding menu item with child element
    store.commit('awesIo/SET_MENU_ITEM', {
        key: 'examples',
        order: 10,
        props: {
            text: 'Examples',
            href: '/',
            icon: 'settings'
        }
    })

    for (var i = 0; i < navigation.length; i++) {
        if (typeof navigation[i].childs === 'undefined') {
            store.commit('awesIo/SET_MENU_ITEM', {
                key: navigation[i].title.toLowerCase(),
                order: 10,
                props: {
                    text: navigation[i].title,
                    href: '/' + navigation[i].title.toLowerCase()
                }
            })
        } else {
            store.commit('awesIo/SET_MENU_ITEM', {
                key: navigation[i].title.toLowerCase(),
                order: 10,
                props: {
                    text: navigation[i].title,
                    href: '/' + navigation[i].title.toLowerCase()
                }
            })

            for (var j = 0; j < navigation[i].childs.length; j++) {
                store.commit('awesIo/SET_MENU_ITEM', [
                    {
                        parent: navigation[i].title.toLowerCase(),
                        order: 5,
                        props: {
                            text: navigation[i].childs[j],
                            href:
                                '/' +
                                navigation[i].title.toLowerCase() +
                                '/' +
                                navigation[i].childs[j].toLowerCase()
                        }
                    }
                ])
            }
        }
    }
}
