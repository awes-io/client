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

            const token = data.meta.token

            // set token
            const twofactor = this.$auth.strategies.twofactor
            await twofactor.setUserToken(token)
        } catch (e) {
            const message = pathOr(e.message, 'response.data.message', e)
            const statusCode = pathOr(500, 'response.status', e)
            this.$nuxt.error({ message, statusCode })
        }
    }
}
</script>
