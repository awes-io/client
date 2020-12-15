<template>
    <AwPage :title="headline">
        <AwDisplayDate date="12.09.1995" parse-format="DD.MM.YYYY" />

        <AwCodeSnippet v-text="codeDefault" class="mt-3" />

        <h3>Display Format</h3>

        <p>
            You can change display format of date by specifying a
            <code>display-format</code> prop
        </p>

        <p>Default - <code>LL</code></p>

        <p>
            Full list of supported formats can be found
            <AwLink href="https://day.js.org/docs/en/display/format">
                here
            </AwLink>
        </p>

        <AwDisplayDate
            date="12.09.1995"
            parse-format="DD.MM.YYYY"
            display-format="L"
            class="block mt-4"
        />

        <AwCodeSnippet v-text="codeFormat" class="mt-3" />

        <h3>Show age</h3>
        Age can be shown by setting <code>show-age</code> prop to
        <code>true</code>
        <AwDisplayDate date="1995-10-10" show-age class="block mt-4" />

        <AwCodeSnippet v-text="codeHideAge" class="mt-3" />
    </AwPage>
</template>

<script>
export default {
    name: 'aw-display-date',

    data() {
        return {
            title: 'AwDisplayDate',
            headline: this._getTitle('AwDisplayDate')
        }
    },

    computed: {
        codeDefault() {
            return '<AwDisplayDate date="12.09.1995" parse-format="DD.MM.YYYY" />'
        },

        codeFormat() {
            const arr = [
                '<AwDisplayDate',
                '    date="12.09.1995"',
                '    parse-format="DD.MM.YYYY"',
                '    display-format="L"',
                '/>'
            ]
            return arr.join('\n')
        },

        codeHideAge() {
            return ' <AwDisplayDate date="1995-10-10" show-age />'
        }
    }
}
</script>
