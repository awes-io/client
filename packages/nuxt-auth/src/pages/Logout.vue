<script>
export default {
    name: 'PageLogout',

    // fake render
    render(h) {
        return h('div')
    },

    beforeRouteEnter(toRoute, fromRoute, next) {
        next(vm => {
            vm.$auth.logout()
        })
    }
}
</script>
