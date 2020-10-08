<script>
import { pathOr } from 'rambdax'

export default {
    name: 'LoginOAuth',

    auth: 'guest',

    layout: 'empty',

    render(h) {
        return h('div')
    },

    async mounted() {
        const service = this.$route.params.service

        try {
            const { data } = await this.$axios.request({
                method: 'get',
                url: `/api/login/${service}/callback`,
                params: this.$route.query
            })

            const user = data.data
            const token = data.meta.token

            // set token
            const twofactor = this.$auth.strategies.twofactor
            const typedToken = twofactor._addTokenType(token)
            this.$auth.setToken('twofactor', typedToken)
            twofactor._setToken(typedToken)

            // set user
            this.$auth.setUser(user)

            const homeUrl = pathOr('/', 'options.redirect.home', this.$auth)
            this.$router.push(homeUrl)
        } catch (e) {
            const message = pathOr(e.message, 'response.data.message', e)
            const statusCode = pathOr(500, 'response.status', e)
            this.$nuxt.error({ message, statusCode })
        }
    }
}
</script>
