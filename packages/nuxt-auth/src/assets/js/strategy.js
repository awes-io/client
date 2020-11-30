import { pathOr } from 'rambdax'
import Local from '@nuxtjs/auth/lib/schemes/local'

export default class extends Local {
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
        try {
            await super.login(endpoint)
        } catch (error) {
            this._handleTwoFactorError(error)
        }
    }

    _handleTwoFactorError(error) {
        const status = pathOr(500, 'response.status', error)
        // const token = pathOr(false, 'response.data.meta.token', error)

        if (status === 403 /* && token */) {
            // this.$auth.setToken(this.name, token)
            // this._setToken(token)
            this.$auth.ctx.redirect('/twofactor-verify')
        } else {
            throw error
        }
    }
}
