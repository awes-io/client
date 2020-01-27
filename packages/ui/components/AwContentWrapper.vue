<template>
    <component :is="tag">
        <!-- any external component -->
        <slot v-bind="{ data }"></slot>
    </component>
</template>

<script>
import WatchParams from '../mixins/watch-params'

export default {
    name: 'AwContentWrapper',

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
         * POST request url for fetching data from a server
         */
        url: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            data: null
        }
    },

    created() {
        this._fetchFromWatcher()
    },

    methods: {
        async _fetchFromWatcher() {
            const res = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.fetchQuery())
            })
            this.data = await res.json()
        }
    }
}
</script>
