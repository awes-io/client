export default ({ store }) => {
    // const can = store.getters.can

    store.commit('awesIo/SET_MENU_ITEM', [
        {
            key: 'appointments',
            order: 0,
            props: {
                text: 'Appointments',
                href: '/',
                icon: 'schedule'
            }
        },
        {
            key: 'admin',
            order: 1,
            props: {
                text: 'Admin',
                href: '/admin',
                icon: 'settings',
                show: () => store.getters.can('view', 'Settings')
            }
        }
    ])
}
