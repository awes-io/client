export default function({ store, app }) {
    // adding menu item with child element
    store.commit('awesIo/SET_MENU_ITEM', {
        key: 'dashboard',
        order: 10,
        props: {
            text: 'Components',
            href: '/',
            icon: 'dashboard'
        }
    })
}
