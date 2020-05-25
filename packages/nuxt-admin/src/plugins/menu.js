export default function({ store, app }) {
    store.commit('awesIo/SET_MENU_ITEM', [
        {
            key: 'admin',
            order: 99,
            props: {
                text: () => app.i18n.t('AwesIoNuxtAdmin.admin'),
                icon: 'user',
                expanded: true
            },
            children: [
                {
                    key: 'admin_users',
                    order: 2,
                    props: {
                        text: () => app.i18n.t('AwesIoNuxtAdmin.employees'),
                        href: () => app.localePath({ path: '/admin/users' })
                    }
                },
                {
                    key: 'admin_roles',
                    order: 3,
                    props: {
                        text: () => app.i18n.t('AwesIoNuxtAdmin.roles'),
                        href: () => app.localePath({ path: '/admin/roles' })
                    }
                }
            ]
        }
    ])
}
