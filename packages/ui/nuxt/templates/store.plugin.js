import storeModule from '@awes-io/ui/store/awesIo.js'

export default ({ store, app }) => {
    /**
     * Register store module
     */
    if (!store.hasModule('awesIo')) {
        store.registerModule('awesIo', storeModule)
    }

    /**
     * Sync router with store
     */
    app.router.afterEach((...transition) =>
        store.commit('awesIo/SET_ROUTE', transition)
    )
}
