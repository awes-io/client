import userAvatar from '@awes-io/nuxt-profile/src/store/user-avatar'

export default async ({ store, app }) => {
    store.commit('awesIo/SET_USER_MENU_ITEM', {
        key: 'profile',
        order: 10,
        item: {
            component: 'AwLink',
            props: {
                text: () => app.i18n.t('AwesIoProfile.profileTab'),
                href: app.localePath({ path: '/profile' }, app.i18n.locale)
            }
        }
    })

    store.registerModule(['auth', 'avatar'], userAvatar, {
        preserveState: true
    })
}
