<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 4 }">
            <AwCropper :src="src" />
        </AwGrid>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwCropper',
            headline: this._getTitle('AwCropper'),
            src:
                'https://images.pexels.com/photos/3224155/pexels-photo-3224155.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
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
