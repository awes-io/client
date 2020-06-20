<template>
    <AwPage :title="headline">
        <section>
            <AwGrid :col="{ md: 3, lg: 4 }">
                TWESTASDASDASDASDASD
            </AwGrid>
        </section>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwDashboardDonutTEST',
            headline: this._getTitle('AwDashboardDonut')
        }
    },

    computed: {
        code() {
            const arr = [
                '<AwGrid :col="{ md: 3, lg: 4 }">',
                '    <AwDashboardCard',
                '        title="Revenue"',
                '        number="$1 930"',
                '        description="This year"',
                '        footer="TOTAL VISITS: 20"',
                '        icon="settings"',
                '        color="info"',
                '    >',
                '        <template #content>',
                '            <!-- Hidden content here -->',
                '        </template>',
                '    </AwDashboardCard>',
                '</AwGrid>'
            ]

            return arr.join('\n')
        },

        hiddenCode() {
            const arr = [
                '<AwGrid :col="{ md: 3, lg: 4 }">',
                '    <AwDashboardCard',
                '        title="Revenue"',
                '        number="$1 930"',
                '        description="This year"',
                '        footer="TOTAL VISITS: 20"',
                '        color="info"',
                '        hide-button',
                '    >',
                '        <template #content>',
                '            <!-- Hidden content here -->',
                '        </template>',
                '    </AwDashboardCard>',
                '</AwGrid>'
            ]

            return arr.join('\n')
        },

        defaultSlotCode() {
            const arr = [
                '<AwGrid :col="{ md: 3, lg: 4 }">',
                '    <AwDashboardCard>',
                '        <template #default>',
                '            <div>',
                '                <h3>Custom header</h3>',
                '                <p>',
                '                    Lorem ipsum dolor sit amet consectetur,',
                '                    adipisicing elit.',
                '                </p>',
                '                <div class="mt-10 flex justify-end">',
                '                    <a href="https://www.google.com/" target="_blank">Footer link</a>',
                '                </div>',
                '            </div>',
                '        </template>',
                '',
                '        <template #content>',
                '            <div class="px-5 py-4">',
                '                Hidden content',
                '            </div>',
                '        </template>',
                '    </AwDashboardCard>',
                '</AwGrid>'
            ]
            return arr.join('\n')
        }
    },

    methods: {
        getList() {
            const tags = [
                { title: 'Manicure', num: 55 },
                { title: 'Pedicure', num: 25 },
                { title: 'Eyebrow modeling and coloring', num: 15 },
                { title: 'Manicure', num: 55 },
                { title: 'Pedicure', num: 25 },
                { title: 'Eyebrow modeling and coloring', num: 15 }
            ]
            return tags
                .map(el => {
                    return this.getLi(this.getContent(el))
                })
                .join('')
        },

        getLi(content) {
            return `<li class="flex justify-between border-dashed border-b border-surface py-2">${content}</li>`
        },

        getContent(item) {
            return `${item.title} <span class="font-bold">${item.num}%</span>`
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
