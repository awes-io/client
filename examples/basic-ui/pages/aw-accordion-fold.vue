<template>
    <AwPage :title="headline">
        <AwButton @click="show = !show" size="sm">Toggle</AwButton>

        <AwAccordionFold :show="show" tag="div">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            provident nemo dolores dicta dolor quia aspernatur dignissimos, in,
            fugit animi, cumque mollitia nesciunt vitae! Et, aliquid maiores?
            Aspernatur, error odit?
        </AwAccordionFold>

        <AwCodeSnippet v-text="code" class="mt-3" />
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwAccordionFold',
            headline: this._getTitle('AwAccordionFold'),
            show: false
        }
    },

    computed: {
        code() {
            const code = [
                '<AwButton @click="show = !show" size="sm">Toggle</AwButton>',
                '',
                '<AwAccordionFold :show="show" tag="div">',
                '   <!-- content here -->',
                '</AwAccordionFold>'
            ]
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
