<script>
import { pathOr } from 'ramda'

export default {
    name: 'LoginOAuth',

    auth: 'guest',

    render(h) {
        return h('div')
    },

    async mounted() {
        const service = this.$route.params.service
        const params = this.$route.query

        const { data } = await this.$axios.request({
            method: 'get',
            url: `/api/login/${service}/callback`,
            params
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

        const loginUrl = pathOr(
            '/',
            ['options', 'redirect', 'home'],
            this.$auth
        )
        this.$router.push(loginUrl)
    }
}
</script>
