export default {
    methods: {
        redirectToUsers() {
            this.$router.push(
                this.localePath({
                    path: `/admin/users`
                })
            )
        }
    }
}
