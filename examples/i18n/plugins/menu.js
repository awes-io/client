export default ({ app, store }) => {
    store.commit('awesIo/SET_MENU_ITEMS', {
        mock: {
            order: 1,
            text: 'statuses.new',
            icon: 'circle',
            href: '/'
        }
    })

    store.commit('awesIo/SET_USER_MENU_ITEM', {
        key: 'mock',
        order: 1,
        item: {
            component: 'AwLink',
            props: {
                text: () => app.i18n.t('statuses.confirmed'),
                href: () => app.localePath({ path: '/' })
            }
        }
    })
}
