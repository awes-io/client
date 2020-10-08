<script>
import { pathOr } from 'rambdax'

export default {
    name: 'PageLogout',

    layout: 'empty',

    render(h) {
        return h('div')
    },

    async mounted() {
        await this.$auth.logout()
        const loginUrl = pathOr('/login', 'options.redirect.login', this.$auth)
        this.$router.push(loginUrl)
    }
}
</script>
