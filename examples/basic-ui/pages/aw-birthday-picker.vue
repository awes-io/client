<template>
    <AwPage :title="headline">
        <AwBirthdayPicker
            v-model="date"
            full-parse-format="DD.MM.YYYY"
            short-parse-format="DD.MM"
        />

        <AwCodeSnippet v-text="code" class="mt-6" />

        <h3 class="h3 mt-8">Always show year</h3>
        <AwBirthdayPicker
            :value="new Date()"
            full-parse-format="DD.MM.YYYY"
            short-parse-format="DD.MM"
            show-year
            label="Select Date"
        />

        <AwCodeSnippet v-text="codeYear" class="mt-6" />
    </AwPage>
</template>

<script>
import dayjs from 'dayjs'

export default {
    name: 'aw-birthday-picker',

    data() {
        return {
            title: 'AwBirthdayPicker',
            headline: this._getTitle('AwBirthdayPicker'),
            date: null
        }
    },

    computed: {
        code() {
            const arr = [
                '<AwBirthdayPicker',
                '    v-model="date"',
                '    full-parse-format="DD.MM.YYYY"',
                '    short-parse-format="DD.MM"',
                '/>'
            ]
            return arr.join('\n')
        },

        codeYear() {
            const arr = [
                '<AwBirthdayPicker',
                '    :value="new Date()"',
                '    full-parse-format="DD.MM.YYYY"',
                '    short-parse-format="DD.MM"',
                '    show-year',
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
