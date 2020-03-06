export default ({ store, app }) => {
    // set menu item
    store.commit('awesIo/SET_USER_MENU_ITEM', {
        key: 'logout',
        order: 50,
        item: {
            component: 'AwLink',
            props: {
                text: () => app.i18n.t('AwesIoAuth.logout'),
                href: app.localePath({ path: '/logout' }, app.i18n.locale)
            }
        }
    })
}
