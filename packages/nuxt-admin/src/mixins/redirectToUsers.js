export default {
    methods: {
        redirectToUsers() {
            this.$router.push({
                path: `/admin/users`
            })
        }
    }
}
