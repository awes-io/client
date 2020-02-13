<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 4 }">
            <AwCard background="transperent"
                >Card #1<br /><small>Background: transperent</small></AwCard
            >
            <AwCard title="Card #2"><small>Card with headline.</small></AwCard>
            <AwCard title="Card #3" text="Short description"
                ><small>With description and headline.</small></AwCard
            >
            <AwCard title="Card #3" text="Short description" link="/"
                ><small>With description and headline as a link.</small></AwCard
            >
        </AwGrid>

        <h3>Example usage</h3>

        <AwCodeSnippet v-text="code" class="mt-3" />
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwCard',
            headline: this._getTitle('AwCard'),
            sizes: ['sm', 'md', 'lg']
        }
    },
    computed: {
        code() {
            const arr = [
                '<AwCard title="Card #3" text="Short description" link="/">',
                '   <small>With description and headline as a link.</small>',
                '</AwCard>'
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
