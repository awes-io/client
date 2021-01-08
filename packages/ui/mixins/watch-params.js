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
                this.watchParams.forEach((name) => {
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
            const unwatcher = this.$watch(() => {
                const vars = this.watchParams.map((param) => {
                    return this.$route.query[param]
                })
                return vars.join(', ')
            }, this._fetchFromWatcher)

            this.$once('hook:beforeDestroy', () => {
                unwatcher()
            })
        }
    }
}
