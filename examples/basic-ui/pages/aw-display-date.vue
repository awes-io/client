<template>
    <AwPage :title="headline">
        <AwDisplayDate
            date="12.12.1990"
            full-parse-format="DD.MM.YYYY"
            short-parse-format="DD.MM"
        />

        <AwCodeSnippet v-text="codeDefault" class="mt-3" />

        <h3>Display Format</h3>

        <p>
            You can change display format of date by specifying a
            <code>full-display-format</code> and
            <code>short-display-format</code> prop
        </p>

        <p>Default full - <code>LL</code></p>
        <p>Default short - <code>MMMM D</code></p>

        <p>
            Full list of supported formats can be found
            <AwLink href="https://day.js.org/docs/en/display/format">
                here
            </AwLink>
        </p>

        <h4 class="h4">Example</h4>

        <AwDisplayDate
            date="12.09.1995"
            full-parse-format="DD.MM.YYYY"
            short-parse-format="DD.MM"
            full-display-format="L"
            class="block mt-4"
        />

        <AwCodeSnippet v-text="codeFormat" class="mt-3" />

        <h3>Show age</h3>
        Age can be shown by setting <code>show-age</code> prop to
        <code>true</code>
        <h4 class="h4">Example</h4>
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
            const arr = [
                '<AwDisplayDate',
                '    date="12.09.1995"',
                '    full-parse-format="DD.MM.YYYY"',
                '    short-parse-format="DD.MM"',
                '/>'
            ]
            return arr.join('\n')
        },

        codeFormat() {
            const arr = [
                '<AwDisplayDate',
                '   date="12.09.1995"',
                '   full-parse-format="DD.MM.YYYY"',
                '   short-parse-format="DD.MM"',
                '   full-display-format="L"',
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
