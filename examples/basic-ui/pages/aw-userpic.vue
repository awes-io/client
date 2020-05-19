<template>
    <AwPage :title="headline">
        <h3>Simple</h3>

        <div class="flex" ref="simple">
            <AwUserpic name="John Doe" class="mr-4" />
            <AwUserpic
                :src="require('@/assets/img/avatar_placeholder.png')"
                name="John Doe"
            />
        </div>

        <AwCodeSnippet v-text="code" class="mt-3" />

        <h3>Hidden name</h3>

        <div class="flex">
            <AwUserpic name="John Doe" hide-name class="mr-4" />
            <AwUserpic
                :src="require('@/assets/img/avatar_placeholder.png')"
                hide-name
            />
        </div>

        <AwCodeSnippet v-text="codeHiddenName" class="mt-3" />

        <h3>Big image</h3>

        <div class="flex">
            <AwUserpic name="John Doe" big-image class="mr-4" />
            <AwUserpic
                :src="require('@/assets/img/avatar_placeholder.png')"
                name="John Doe"
                big-image
            />
        </div>

        <AwCodeSnippet v-text="codeBigImage" class="mt-3" />

        <h3>With description</h3>

        <div class="flex">
            <AwUserpic
                name="John Doe"
                description="description"
                big-image
                class="mr-4"
            />
            <AwUserpic
                :src="require('@/assets/img/avatar_placeholder.png')"
                name="John Doe"
                description="description"
                big-image
            />
        </div>

        <AwCodeSnippet v-text="codeDescription" class="mt-3" />
    </AwPage>
</template>

<script>
export default {
    name: 'UserpicPage',

    data() {
        return {
            title: 'AwUserpic',
            headline: this._getTitle('AwUserpic'),
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
                '<AwUserpic name="John Doe" />',
                '<AwUserpic',
                `    src="image url here"`,
                '    name="John Doe"',
                '/>'
            ]
            return arr.join('\n')
        },

        codeHiddenName() {
            const arr = [
                '<AwUserpic name="John Doe" hide-name />',
                '<AwUserpic',
                `    src="image url here"`,
                '    hide-name',
                '/>'
            ]
            return arr.join('\n')
        },

        codeBigImage() {
            const arr = [
                '<AwUserpic name="John Doe" big-image />',
                '<AwUserpic',
                '    name="John Doe"',
                `    src="image url here"`,
                '    big-image',
                '/>'
            ]
            return arr.join('\n')
        },

        codeDescription() {
            const arr = [
                '<AwUserpic name="John Doe" description="description" big-image />',
                '<AwUserpic',
                '    name="John Doe"',
                '    description="description"',
                `    src="image url here"`,
                '    big-image',
                '/>'
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
