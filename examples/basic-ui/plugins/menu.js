export default function({ store }) {
    // adding menu item with child element
    store.commit('awesIo/SET_MENU_ITEM', {
        key: 'examples',
        order: 10,
        props: {
            text: 'Examples',
            href: '/',
            icon: 'intelligence'
        }
    })

    store.commit('awesIo/SET_MENU_ITEM', {
        key: 'buttons',
        order: 10,
        props: {
            text: 'Buttons',
            href: '/buttons'
        }
    })

    store.commit('awesIo/SET_MENU_ITEM', {
        key: 'chart',
        order: 10,
        props: {
            text: 'Chart',
            href: '/chart'
        }
    })
}
