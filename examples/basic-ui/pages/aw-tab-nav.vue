<template>
    <AwPage :title="headline">
        <h2>Router links</h2>
        <AwTabNav :items="routes" />

        <AwCodeSnippet v-text="codeLinks" class="mt-3" />

        <h2>Buttons</h2>
        <AwTabNav :items="['One', 'Two', 'Three']" :active.sync="active" />

        <AwCodeSnippet v-text="buttonLinks" class="mt-3" />

        <h2>Badges</h2>
        <h5>Links with badges</h5>

        <AwTabNav :items="routesBadges" />

        <AwCodeSnippet v-text="codeLinksBadges" class="mt-3" />

        <h5>Buttons with badges</h5>
        <AwTabNav :items="badges" :active.sync="activeBadge" />

        <AwCodeSnippet v-text="codeButtonBadges" class="mt-3" />
    </AwPage>
</template>

<script>
export default {
    name: 'TabsPage',

    data() {
        return {
            title: 'AwTabNav',
            headline: this._getTitle('AwTabNav'),
            routes: [
                {
                    text: 'Order default',
                    href: { query: { orderBy: null } }
                },
                {
                    text: 'Order by name',
                    href: { query: { orderBy: 'name' } }
                },
                { text: 'Order by id', href: { query: { orderBy: 'id' } } }
            ],
            routesBadges: [
                {
                    text: 'Order default',
                    href: { query: { orderBy: null } },
                    badge: { color: 'info', text: '4' }
                },
                {
                    text: 'Order by name',
                    href: { query: { orderBy: 'name' } },
                    badge: { color: 'warning', text: '2' }
                },
                {
                    text: 'Order by id',
                    href: { query: { orderBy: 'id' } },
                    badge: { color: 'error', text: '1' }
                }
            ],
            badges: [
                {
                    text: 'One',
                    badge: { color: 'error', text: '15' }
                },
                {
                    text: 'Two',
                    badge: { color: 'success', text: '3' }
                },
                {
                    text: 'Three',
                    badge: { color: 'success', text: '0', hideIfEmpty: true }
                }
            ],
            active: 2,
            activeBadge: 1,
            buttonLinks: `<AwTabNav :items="['One', 'Two', 'Three']" :active.sync="active" />`
        }
    },

    computed: {
        codeLinks() {
            const arr = [
                '<AwTabNav :items="[',
                "   { text: 'Order default', href: { query: { orderBy: null } } }",
                "   { text: 'Order by name', href: { query: { orderBy: 'name' } } }",
                "   { text: 'Order by id', href: { query: { orderBy: 'id' } } }",
                ']"/>'
            ]
            return arr.join('\n')
        },

        codeButtonBadges() {
            const arr = [
                '<AwTabNav :items="[',
                "   { text: 'One', badge: { color: 'error', text: '15' } }",
                "   { text: 'Two', badge: { color: 'success', text: '3' } }",
                "   { text: 'Three', badge: { color: 'success', text: '0', hideIfEmpty: true } }",
                ']"/>'
            ]
            return arr.join('\n')
        },

        codeLinksBadges() {
            const arr = [
                '\n<AwTabNav :items="[',
                "   { text: 'Order default', href: { query: { orderBy: null } }, badge: { color: 'info', text: '4' } }",
                "   { text: 'Order by name', href: { query: { orderBy: 'name' } }, badge: { color: 'warning', text: '2' } }",
                "   { text: 'Order by id', href: { query: { orderBy: 'id' } }, badge: { color: 'error', text: '1' } }",
                ']"/>'
            ]
            return arr.join('\n')
        }
    },

    methods: {
        isActive(items) {
            return items.findIndex(
                ({ href }) => href.query.orderBy == this.$route.query.orderBy
            )
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
