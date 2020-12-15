<template>
    <AwPage :title="headline">
        <AwBirthdayDate date="12.09.1995" parse-format="DD.MM.YYYY" />

        <AwCodeSnippet v-text="codeDefault" class="mt-3" />

        <h3>Display Format</h3>

        <p>
            You can change display format of date by specifying a
            <code>display-format</code> prop
        </p>

        <p>
            Full list of supported formats can be found
            <AwLink
                href="https://day.js.org/docs/en/display/format#list-of-localized-formats"
            >
                here
            </AwLink>
        </p>

        <AwBirthdayDate
            date="12.09.1995"
            parse-format="DD.MM.YYYY"
            display-format="L"
            class="block mt-4"
        />

        <AwCodeSnippet v-text="codeFormat" class="mt-3" />

        <h3>Hide age</h3>
        Age can be hidden by setting <code>hide-age</code> to <code>true</code>
        <AwBirthdayDate date="1995-10-10" hide-age class="block mt-4" />

        <AwCodeSnippet v-text="codeHideAge" class="mt-3" />
    </AwPage>
</template>

<script>
export default {
    name: 'aw-birthday-date',

    data() {
        return {
            title: 'AwBirthdayDate',
            headline: this._getTitle('AwBirthdayDate')
        }
    },

    computed: {
        codeDefault() {
            return '<AwBirthdayDate date="12.09.1995" parse-format="DD.MM.YYYY" />'
        },

        codeFormat() {
            const arr = [
                '<AwBirthdayDate',
                '    date="12.09.1995"',
                '    parse-format="DD.MM.YYYY"',
                '    display-format="L"',
                '/>'
            ]
            return arr.join('\n')
        },

        codeHideAge() {
            return ' <AwBirthdayDate date="1995-10-10" hide-age />'
        }
    }
}
</script>
