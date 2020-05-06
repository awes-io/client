import Vue from 'vue'
import { isType } from 'rambdax'
import {
    OFFLINE_FRAME_ID,
    default as OfflineFrame
} from '@awes-io/ui/nuxt/layouts/LayoutOfflineFrame.vue'

let offlineNotifyRemover = null

export default {
    head() {
        if (isType('Function', this.$nuxtI18nSeo)) {
            const meta = this.$nuxtI18nSeo()

            return {
                ...meta,
                htmlAttrs: {
                    ...meta.htmlAttrs,
                    ...(this.isDarkTheme ? { 'data-dark': true } : {})
                }
            }
        } else if (this.isDarkTheme) {
            return {
                htmlAttrs: { 'data-dark': true }
            }
        }
    },

    computed: {
        isDarkTheme() {
            return this.$store.state.awesIo.isDarkTheme
        }
    },

    watch: {
        '$nuxt.isOffline': {
            handler(offline) {
                if (this.$isServer) return

                const frame =
                    document.getElementById(OFFLINE_FRAME_ID) ||
                    this._createOfflineFrame()

                if (offline) {
                    frame.style.display = null
                    offlineNotifyRemover = this.$notify({
                        timeout: 0,
                        type: 'error',
                        title: this.$t('AwLayoutDefault.offline'),
                        text: this.$t('AwLayoutDefault.offlineText'),
                        icon: false,
                        closable: false
                    })
                } else {
                    if (isType('Function', offlineNotifyRemover)) {
                        offlineNotifyRemover()
                        offlineNotifyRemover = null
                    }
                    frame.style.display = 'none'
                }
            },
            immediate: true
        }
    },

    methods: {
        _createOfflineFrame() {
            let frameBody = document.createElement('DIV')
            document.body.appendChild(frameBody)
            const frame = new Vue(OfflineFrame).$mount(frameBody)
            frameBody = null
            return frame.$el
        }
    }
}
