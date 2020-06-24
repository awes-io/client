export default {
    methods: {
        redirectToRoles() {
            this.$router.push(
                this.localePath({
                    path: `/admin/roles`
                })
            )
        }
    }
}
