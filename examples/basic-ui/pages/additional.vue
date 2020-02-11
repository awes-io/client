<template>
    <AwPage :title="title">
        <h3>Comma</h3>

        <p><code>.comma</code> class adds comma before current element</p>

        <h5>Example:</h5>

        <div>
            <span
                v-for="(item, index) in items"
                :key="item"
                class="comma"
            >
                {{ item }}
            </span>
        </div>

        <AwCodeSnippet v-text="codeComma" class="mt-3" />
    </AwPage>
</template>

<script>
export default {
    name: 'AdditionalPage',

    data() {
        return {
            title: 'Additional styles',
            items: [
                'Lorem',
                'ipsum',
                'dolor',
                'sit',
                'amet',
                'consectetur',
                'adipisicing',
                'elit'
            ]
        }
    },

    computed: {
        codeComma() {
            const arr = [
                '<div>',
                '   <span class="comma">Lorem</span>',
                '   <span class="comma">ipsum</span>',
                '   <span class="comma">dolor</span>',
                '   <span class="comma">sit</span>',
                '   <span class="comma">amet</span>',
                '   <span class="comma">consectetur</span>',
                '   <span class="comma">adipisicing</span>',
                '   <span class="comma">elit</span>',
                '</div>'
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
