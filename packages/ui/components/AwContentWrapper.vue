<template>
    <component :is="tag">
        <!-- default -->
        <slot v-bind="{ data }"></slot>
    </component>
</template>

<script>
import WatchParams from '../mixins/watch-params'

export default {
    name: 'AwContentWrapper',

    mixins: [WatchParams],

    props: {
        tag: {
            type: String,
            default: 'div'
        },

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
