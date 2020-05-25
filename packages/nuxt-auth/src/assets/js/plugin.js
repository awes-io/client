import Vue from 'vue'
import { pathOr } from 'rambdax'
import { Ability } from '@casl/ability'
import { Can, abilitiesPlugin } from '@casl/vue'

Vue.use(abilitiesPlugin, new Ability())

Vue.component('Can', Can)

export default ({ store, app }) => {
    // set menu item
    store.commit('awesIo/SET_USER_MENU_ITEM', {
        key: 'logout',
        order: 50,
        item: {
            component: 'AwLink',
            props: {
                text: () => app.i18n.t('AwesIoAuth.logout'),
                href: () => app.localePath({ path: '/logout' })
            }
        }
    })

    store.watch(
        state => pathOr([], 'auth.user.permissions', state),
        newPermissions => {
            Vue.prototype.$ability.update(newPermissions)
        },
        { immediate: true }
    )

    store.registerModule(
        'permission',
        {
            getters: {
                can: () =>
                    function() {
                        return Vue.prototype.$ability.can(...arguments)
                    }
            }
        },
        {
            preserveState: true
        }
    )
}
