<template>
    <AwPage :title="headline">
        <p>
            Used to highlight information to a user or to just draw attention to
            a specific element. Content within the badge usually contains
            numbers or icons.
        </p>

        <h3>Examples</h3>

        <h5>Default badge:</h5>
        <AwBadge text="8" color="info">Badge</AwBadge>
        <br />
        Badge text <AwBadge text="15" color="error" />

        <AwCodeSnippet v-text="defaultCode" class="mt-3" />

        <h5>Badge colors:</h5>
        <span v-for="color in colors" :key="color" class="mx-2">
            <AwBadge :color="color" text="2">
                {{ color || 'default' }}
            </AwBadge>
        </span>

        <h5>Badge icon:</h5>
        <AwBadge icon="duotone/cog">
            Settings
        </AwBadge>

        <AwCodeSnippet v-text="iconCode" class="mt-3" />

        <div class="mt-3">
            <AwLink href="/aw-icon" target="_blank">
                List of all available icons you can find here
            </AwLink>
        </div>

        <h5>Hide badge</h5>
        <p>
            You can hide badge when <code>text</code> prop is empty or 0 or '0'
            by setting <code>hideIfEmpty</code> prop to <code>true</code>
        </p>

        <AwCheckbox v-model="isBadgeHidden" label="Hide badge when text is 0" />

        Some Text <AwBadge text="0" :hide-if-empty="isBadgeHidden" />
        <br />
        <AwBadge text="0" :hide-if-empty="isBadgeHidden" color="info">
            Another example
        </AwBadge>

        <AwCodeSnippet v-text="codeHidden" class="mt-3" />
    </AwPage>
</template>

<script>
export default {
    name: 'BadgePage',

    data() {
        return {
            title: 'AwBadge',
            headline: this._getTitle('AwBadge'),
            colors: ['', 'info', 'success', 'warning', 'error'],
            isBadgeHidden: true
        }
    },

    computed: {
        codeHidden() {
            const arr = [
                '<AwBadge text="0" hide-if-empty>Another example</AwBadge>',
                '<!-- Or Inline -->',
                'Some Text <AwBadge text="0" hide-if-empty color="info" />'
            ]
            return arr.join('\n')
        },
        defaultCode() {
            const code = [
                '<!-- Text as slot -->',
                '<AwBadge text="8" color="info">Badge text</AwBadge>',
                '<!-- Inline -->',
                'Badge text <AwBadge text="15" color="error" />'
            ]
            return code.join('\n')
        },

        iconCode() {
            const code = [
                '<AwBadge icon="duotone/cog">',
                '   Settings',
                '</AwBadge>'
            ]
            return code.join('\n')
        }
    },

    methods: {
        onSwitchChange($event) {
            console.log($event)
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
