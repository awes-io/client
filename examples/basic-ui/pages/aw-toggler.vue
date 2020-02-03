<template>
    <AwPage :title="headline">
        <AwButton @click="toggle" class="mb-3">
            Toggle
        </AwButton>

        <AwToggler :show="isOpen">
            <h6>Lorem ipsum</h6>

            <AwRadio v-model="radioValue" label="Radio input one" value="one" />
            <AwRadio v-model="radioValue" label="Radio input two" value="two" />
            <AwRadio
                v-model="radioValue"
                label="Radio input three"
                value="three"
            />

            <AwButton @click="toggle" class="mt-3" size="sm">
                Close
            </AwButton>
        </AwToggler>

        <AwCodeSnippet v-text="code" class="mt-3" />
    </AwPage>
</template>

<script>
export default {
    name: 'TogglerPage',

    data() {
        return {
            title: 'AwToggler',
            headline: this._getTitle('AwToggler'),
            isOpen: true,
            radioValue: '',
            code: `<AwToggler :show="isOpen">
    // ...content
</AwToggler>`
        }
    },

    methods: {
        toggle() {
            this.isOpen = !this.isOpen
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
