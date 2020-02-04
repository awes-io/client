<template>
    <AwPage :title="headline">
        <p>
            Used to highlight information to a user or to just draw attention to
            a specific element. Content within the badge usually contains
            numbers or icons.
        </p>

        <h3>Examples</h3>

        <h5>Default badge:</h5>
        <AwBadge text="8" color="info">
            Badge
        </AwBadge>

        <AwCodeSnippet v-text="defaultCode" class="mt-3" />

        <h5>Badge colors:</h5>
        <span v-for="color in colors" :key="color" class="mx-2">
            <AwBadge :color="color" text="2">
                {{ color || 'default' }}
            </AwBadge>
        </span>

        <h5>Badge icon:</h5>
        <AwBadge icon="search">
            Search
        </AwBadge>

        <AwCodeSnippet v-text="iconCode" class="mt-3" />

        <div class="mt-3">
            <AwLink href="/aw-icon" target="_blank">
                List of all available icons you can find here
            </AwLink>
        </div>
    </AwPage>
</template>

<script>
export default {
    name: 'BadgePage',

    data() {
        return {
            title: 'AwBadge',
            headline: this._getTitle('AwBadge'),
            colors: ['', 'info', 'success', 'warning', 'error']
        }
    },

    computed: {
        defaultCode() {
            const code = [
                '<AwBadge text="8" color="info">',
                '   Badge text',
                '</AwBadge>'
            ]
            return code.join('\n')
        },

        iconCode() {
            const code = ['<AwBadge icon="search">', '   Search', '</AwBadge>']
            return code.join('\n')
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
