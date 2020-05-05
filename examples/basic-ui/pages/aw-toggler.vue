<template>
    <AwPage :title="headline">
        <h3>Basic usage</h3>
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

            <AwSelect
                v-model="select"
                :options="['1', '2', '3', '4', '5', '6']"
                class="my-2"
            />

            <AwButton @click="toggle" class="mt-3" size="sm">
                Close
            </AwButton>
        </AwToggler>

        <AwCodeSnippet v-text="code" class="mt-3" />

        <h3>Show on input</h3>

        <AwInput v-model="inputValue" type="number" label="Price" />

        <AwToggler :show="!!inputValue.length" class="mt-1">
            <h6>Reason</h6>
            <AwRadio v-model="disountReason" label="First" value="1" />
            <AwRadio v-model="disountReason" label="Second" value="2" />
            <AwRadio v-model="disountReason" label="Third" value="3" />
        </AwToggler>

        <AwCodeSnippet v-text="inputCode" class="mt-3" />
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
            inputValue: '',
            disountReason: '1',
            select: '1'
        }
    },

    computed: {
        code() {
            const arr = [
                '<AwToggler :show="isOpen">',
                '   <!-- content -->',
                '</AwToggler>`'
            ]
            return arr.join('\n')
        },

        inputCode() {
            const arr = [
                '<AwInput v-model="inputValue" label="Price" type="number"/>',
                '<AwToggler :show="!!inputValue.length" class="mt-1">',
                '   <h6>Reason</h6>',
                '   <AwRadio v-model="disountReason" label="First" value="1" />',
                '   <AwRadio v-model="disountReason" label="Second" value="2" />',
                '   <AwRadio v-model="disountReason" label="Third" value="3" />',
                '</AwToggler>'
            ]
            return arr.join('\n')
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
