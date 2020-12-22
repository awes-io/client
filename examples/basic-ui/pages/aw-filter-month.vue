<template>
    <AwPage :title="headline">
        <AwFilterMonth />
        <AwFilterMonth label="Date" />

        <AwCodeSnippet v-text="code" class="mt-5" />

        <h3>Sizes</h3>

        <AwFilterMonth size="sm" />
        <AwFilterMonth size="md" />
        <AwFilterMonth size="lg" />

        <div class="mt-4">
            <AwFilterMonth size="sm" label="Date" />
            <AwFilterMonth size="md" label="Date" />
            <AwFilterMonth size="lg" label="Date" />
        </div>

        <AwCodeSnippet v-text="codeSize" class="mt-5" />

        <h3>Min/Max</h3>
        Props <code>min</code> and <code>max</code> accepts String, Date, Dayjs,
        Timestamp values

        <div class="mt-4">
            <AwFilterMonth :min="new Date()" />
            <AwFilterMonth :max="new Date().getTime()" />
        </div>

        <AwCodeSnippet v-text="codeMinMax" class="mt-5" />

        <h3>Date formatting</h3>
        List of all available formats -
        <AwLink href="https://day.js.org/docs/en/display/format">
            here
        </AwLink>

        <div class="mt-4">
            <AwFilterMonth format="MM.YYYY" />
        </div>

        <AwCodeSnippet v-text="codeFormat" class="mt-5" />

        <h5>Format only display value</h5>

        <div class="mt-4">
            <AwFilterMonth display-format="ll" />
        </div>

        <AwCodeSnippet v-text="codeFormatDisplay" class="mt-5" />

        <h3>URL param</h3>

        <div class="mt-4">
            <AwFilterMonth param="month" />
        </div>

        <AwCodeSnippet v-text="codeParam" class="mt-5" />
    </AwPage>
</template>

<script>
import dayjs from 'dayjs'

export default {
    name: 'aw-filter-month',

    data() {
        return {
            title: 'AwFilterMonth',
            headline: this._getTitle('AwFilterMonth'),
            min: dayjs()
        }
    },

    computed: {
        code() {
            const arr = ['<AwFilterMonth />', '<AwFilterMonth label="Date" />']
            return arr.join('\n')
        },

        codeSize() {
            const arr = [
                '<AwFilterMonth size="sm" />',
                '<AwFilterMonth size="md" />',
                '<AwFilterMonth size="lg" />',
                '',
                '<AwFilterMonth size="sm" label="Date" />',
                '<AwFilterMonth size="md" label="Date" />',
                '<AwFilterMonth size="lg" label="Date" />'
            ]
            return arr.join('\n')
        },

        codeMinMax() {
            const arr = [
                '<AwFilterMonth :min="new Date()" />',
                '<AwFilterMonth :max="new Date().getTime()" />'
            ]
            return arr.join('\n')
        },

        codeFormat() {
            return '<AwFilterMonth format="MM.YYYY" />'
        },

        codeFormatDisplay() {
            return '<AwFilterMonth display-format="ll" />'
        },

        codeParam() {
            return '<AwFilterMonth param="month" />'
        }
    }
}
</script>

<style></style>
