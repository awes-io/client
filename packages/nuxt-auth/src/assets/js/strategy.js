import { path } from 'ramda'

const DEFAULTS = {
    tokenRequired: true,
    tokenType: 'Bearer',
    globalToken: true,
    tokenName: 'Authorization'
}

export default class TwoFactorScheme {
    constructor(auth, options) {
        this.$auth = auth
        this.name = options._name

        this.options = Object.assign({}, DEFAULTS, options)
    }

    _addTokenType(token) {
        return this.options.tokenType
            ? this.options.tokenType + ' ' + token
            : token
    }

    _setToken(token) {
        if (this.options.globalToken) {
            // Set Authorization token for all axios requests
            this.$auth.ctx.app.$axios.setHeader(this.options.tokenName, token)
        }
    }

    _clearToken() {
        if (this.options.globalToken) {
            // Clear Authorization token for all axios requests
            this.$auth.ctx.app.$axios.setHeader(this.options.tokenName, false)
        }
    }

    _handleTwoFactorError(error) {
        const status = path(['response', 'status'], error)

        if (status === 403) {
            this.$auth.ctx.redirect('/twofactor-verify')
        } else {
            throw error
        }
    }

    mounted() {
        if (this.options.tokenRequired) {
            const token = this.$auth.syncToken(this.name)
            this._setToken(token)
        }

        return this.$auth
            .fetchUserOnce()
            .then(res => res)
            .catch(this._handleTwoFactorError)
    }

    async login(endpoint) {
        if (!this.options.endpoints.login) {
            return
        }

        // Ditch any leftover local tokens before attempting to log in
        await this._logoutLocally()

        const loginResponse = await this.$auth.request(
            endpoint,
            this.options.endpoints.login
        )

        const _token = path(['meta', 'token'], loginResponse)

        if (this.options.tokenRequired) {
            const token = this._addTokenType(_token)
            this.$auth.setToken(this.name, token)
            this._setToken(token)
        }

        await this.fetchUser()
    }

    async fetchUser(endpoint) {
        // Token is required but not available
        if (this.options.tokenRequired && !this.$auth.getToken(this.name)) {
            return
        }

        // User endpoint is disabled.
        if (!this.options.endpoints.user) {
            this.$auth.setUser({})
            return
        }

        // Try to fetch user and then set
        try {
            const user = await this.$auth.requestWith(
                this.name,
                endpoint,
                this.options.endpoints.user
            )
            this.$auth.setUser(user)
        } catch (error) {
            this._handleTwoFactorError(error)
        }
    }

    async logout(endpoint) {
        // Only connect to logout endpoint if it's configured
        if (this.options.endpoints.logout) {
            await this.$auth
                .requestWith(this.name, endpoint, this.options.endpoints.logout)
                .catch(() => {})
        }

        // But logout locally regardless
        return this._logoutLocally()
    }

    async _logoutLocally() {
        if (this.options.tokenRequired) {
            this._clearToken()
        }

        return this.$auth.reset()
    }
}
