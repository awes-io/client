export default {
    props: {
        watchParams: {
            type: Array,
            default: null
        }
    },

    methods: {
        _fetchFromWatcher() {},
        fetchQuery() {
            const params = {}

            if (this.watchParams) {
                this.watchParams.forEach(name => {
                    const value = this.$route.query[name]
                    if (value) {
                        params[name] = value
                    }
                })
            }

            return params
        }
    },

    created() {
        if (this.watchParams) {
            const unwatchers = []

            this.$once('hook:beforeDestroy', () => {
                unwatchers.forEach(unwatch => {
                    unwatch()
                })
            })

            this.watchParams.forEach(param => {
                const unwatcher = this.$watch(
                    `$route.query.${param}`,
                    this._fetchFromWatcher
                )
                unwatchers.push(unwatcher)
            })
        }
    }
}
