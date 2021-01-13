<template>
    <component :is="tag" class="relative">
        <!-- any external component -->
        <div :style="loading ? 'filter: blur(3px);' : null">
            <slot v-bind="{ data }"></slot>
        </div>

        <div
            v-if="loading"
            class="absolute inset-0 flex items-center justify-center"
        >
            <!-- Customization of loading block -->
            <slot name="loading">
                <!-- Default loading block -->
                <AwChip class="bg-mono-300">
                    <AwSvgImage name="spinner" slot="left" class="h-5 w-5" />
                    {{ $t('AwTableBuilder.loading') }}
                </AwChip>
            </slot>
        </div>

        <div
            v-if="error"
            class="absolute inset-0 flex flex-col items-center justify-center"
        >
            <!-- Customization of error -->
            <slot name="error" v-bind="error">
                <!-- Default error block -->
                <h5>{{ error }}</h5>
                <AwButton color="error" @click="_fetchFromWatcher()">
                    Refresh
                </AwButton>
            </slot>
        </div>
    </component>
</template>

<script>
import { pathOr } from 'rambdax'
import WatchParams from '@AwMixins/watch-params'

// Do not show loader if response time is less than wait interval
const LOADER_INTERVAL = 350
let timeout = null

export default {
    name: 'AwFetchData',

    mixins: [WatchParams],

    props: {
        /**
         * The tag of parent node
         */
        tag: {
            type: String,
            default: 'div'
        },

        /**
         * request url for fetching data from a server
         */
        url: {
            type: String,
            required: true
        },

        /**
         * Fetch method
         */
        method: {
            type: String,
            default: 'GET'
        },

        /**
         * Fetch collection immediately when component mounted
         */
        fetch: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            data: null,
            loading: false,
            error: null
        }
    },

    mounted() {
        if (this.fetch) {
            this._fetchFromWatcher()
        }
    },

    methods: {
        async _fetchFromWatcher() {
            // Reset errors
            this.error = null

            // Do not show loader if response time is less than wait interval
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                this.loading = true
            }, LOADER_INTERVAL)

            try {
                const resp = await this.$axios({
                    url: this.url,
                    method: 'GET',
                    params: this.fetchQuery()
                })
                this.data = resp.data.data
            } catch (e) {
                this.error = pathOr('Request error', 'response.data.message', e)
            } finally {
                clearTimeout(timeout)
                this.loading = false
            }
        }
    },

    beforeDestroy() {
        clearTimeout(timeout)
    }
}
</script>
