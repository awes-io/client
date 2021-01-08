<script>
import { pathOr } from 'rambdax'

export default {
    name: 'VerifyEmailPage',

    render(h) {
        return h('div')
    },

    async mounted() {
        const userId = this.$route.params.userId
        const params = this.$route.query

        try {
            await this.$axios.request({
                method: 'get',
                url: `/api/email/verify/${userId}`,
                params
            })
        } catch (e) {
            // statements
            console.log(e)
        }

        const loginUrl = pathOr(
            '/',
            ['options', 'redirect', 'home'],
            this.$auth
        )

        this.$router.push(loginUrl)
    }
}
</script>
