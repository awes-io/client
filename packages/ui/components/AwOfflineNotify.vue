<template>
    <div v-if="$nuxt.isOffline" class="absolute z-100">
        <div class="fixed bg-error z-100 w-2 h-full left-0 top-0"></div>
        <div class="fixed bg-error z-100 w-2 h-full right-0 top-0"></div>
        <div class="fixed bg-error z-100 h-2 w-full left-0 top-0"></div>
        <div class="fixed bg-error z-100 h-2 w-full left-0 bottom-0"></div>
    </div>
</template>

<script>
import { isType } from 'rambdax'

let offlineNotifyRemover = null

export default {
    name: 'AwOfflineNotify',

    watch: {
        '$nuxt.isOffline': {
            handler(offline) {
                if (offline) {
                    offlineNotifyRemover = this.$notify({
                        timeout: 0,
                        type: 'error',
                        title: this.$t('AwLayoutDefault.offline'),
                        text: this.$t('AwLayoutDefault.offlineText'),
                        icon: false,
                        closable: false
                    })
                } else if (isType('Function', offlineNotifyRemover)) {
                    offlineNotifyRemover()
                    offlineNotifyRemover = null
                }
            },
            immediate: true
        }
    }
}
</script>
