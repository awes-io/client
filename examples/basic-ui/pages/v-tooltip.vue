<template>
    <AwPage :title="headline">
        <span class="p-2" v-tooltip="'Default'">Default</span>
        <span class="p-2" v-tooltip:left="'Left'">Left</span>
        <span class="p-2" v-tooltip:right="'Right'">Right</span>
        <span class="p-2" v-tooltip:bottom="'Bottom'">Bottom</span>

        <h2>Color modification</h2>
        <span class="p-2" v-tooltip="'Default'">Default</span>
        <span class="p-2" v-tooltip="{ content: 'Info', class: 'bg-info' }">
            Info
        </span>
        <span
            class="p-2"
            v-tooltip="{ content: 'Success', class: 'bg-success' }"
        >
            Success
        </span>
        <span
            class="p-2"
            v-tooltip="{ content: 'Warning', class: 'bg-warning' }"
        >
            Warning
        </span>
        <span class="p-2" v-tooltip="{ content: 'Error', class: 'bg-error' }">
            Error
        </span>

        <h2>Other options</h2>
        <span class="py-2 px-4" v-tooltip.show="'Always visible'">Show</span>
        <span
            v-if="show"
            v-tooltip.show="{
                content: 'Click me',
                onclick: () => (show = false)
            }"
            class="py-2 px-4"
        >
            Click listener
        </span>
        <span v-else class="py-2 px-4" @click="show = true">
            Click to show tooltip
        </span>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'v-tooltip',
            headline: this._getTitle('v-tooltip'),
            show: true
        }
    },

    head() {
        return {
            title: this._getMetaTitle(this.title),
            meta: [this._getMetaDescription(this.title)]
        }
    }
}
</script>
