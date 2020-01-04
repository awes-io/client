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
    head() {
        return {
            title: this._getMetaTitle(this.title),
            meta: [this._getMetaDescription(this.title)]
        }
    }
}
</script>
