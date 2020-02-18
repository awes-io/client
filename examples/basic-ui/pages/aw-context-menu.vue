<template>
    <AwPage :title="headline">
        <p>
            The context menu component is designed to display hidden by default
            list by clicking the button.
        </p>

        <h3>Minimal example</h3>

        <div class="border p-3 inline-flex border-brand">
            <AwContextMenu :options="{ placement: 'bottom-start' }">
                <AwButton theme="toggle" class="w-full" text="Click me" />
            </AwContextMenu>
        </div>

        <AwCodeSnippet v-text="codeMinimal" class="my-3" />

        <h3>Options</h3>

        <p>
            Component has `options` prop, that contains of popper.js options.
            List of all available options can be found
            <AwLink href="https://popper.js.org/docs/v2/">here</AwLink>
        </p>

        <div class="border p-3 inline-flex border-brand">
            <AwContextMenu :options="{ placement: 'top-start' }">
                <AwButton theme="toggle" class="w-full" text="Click me" />
            </AwContextMenu>
        </div>

        <AwCodeSnippet v-text="codeOptions" class="my-3" />
    </AwPage>
</template>

<script>
export default {
    name: 'ContextMenuPage',

    data() {
        return {
            title: 'AwContextMenu',
            headline: this._getTitle('AwContextMenu')
        }
    },

    computed: {
        codeMinimal() {
            const arr = [
                '<AwContextMenu>',
                '   <AwButton theme="toggle" class="w-full" text="Click me" />',
                '</AwContextMenu>'
            ]
            return arr.join('\n')
        },

        codeOptions() {
            const arr = [
                '<AwContextMenu :options="{ placement: \'top-start\' }">',
                '   <AwButton theme="toggle" class="w-full" text="Click me" />',
                '</AwContextMenu>'
            ]
            return arr.join('\n')
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
