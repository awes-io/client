<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 2, lg: 2, xl: 4 }">
            <AwDashboardSpeed
                :data="data"
                :sections="sections"
                title="Productivity"
            />

            <AwDashboardSpeed
                :data="dataTwo"
                :sections="sectionsTwo"
                title="Productivity"
            />

            <AwDashboardSpeed
                :data="dataTwo"
                :sections="sections"
                title="Productivity"
                :span="{ md: 1, lg: 1, xl: 1 }"
            >
                <template #footer>
                    <div class="flex justify-end my-4 px-4">
                        <a href="https://www.google.com" target="_blank">
                            Footer link
                        </a>
                    </div>
                </template>
            </AwDashboardSpeed>
        </AwGrid>

        <section class="mt-8">
            <AwCodeSnippet v-text="code" />

            <h5>Example data</h5>
            <AwCodeSnippet v-text="data" language="javascript" />

            <h5>Example sections</h5>
            <AwCodeSnippet v-text="sections" language="javascript" />
        </section>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwDashboardSpeed',
            headline: this._getTitle('AwDashboardSpeed'),
            sections: [
                {
                    color: '#E45284',
                    value: 100
                },
                {
                    color: '#E0AB61',
                    value: 120
                },
                {
                    color: '#7DC9AD',
                    value: 150
                }
            ],
            sectionsTwo: [
                {
                    color: '#45A4DC',
                    value: 80
                },
                {
                    color: '#B982D2',
                    value: 110
                },
                {
                    color: '#7FC876',
                    value: 150
                }
            ],
            data: {
                total: 150,
                template: '', // может быть пустым
                elements: [
                    {
                        title: 'Total tasks',
                        value: 150,
                        on_chart: false
                    },
                    {
                        title: 'Completed',
                        value: 105,
                        on_chart: true
                    }
                ]
            },
            dataTwo: {
                total: 150,
                elements: [
                    {
                        title: 'Total tasks',
                        value: 150,
                        on_chart: false
                    },
                    {
                        title: 'Completed',
                        value: 135,
                        on_chart: true
                    }
                ]
            }
        }
    },

    computed: {
        code() {
            const arr = [
                '<AwGrid :col="{ md: 2, lg: 2, xl: 4 }">',
                '    <AwDashboardSpeed',
                '        :data="data"',
                '        :sections="sections"',
                '        title="Productivity"',
                '    />',
                '',
                '    <AwDashboardSpeed',
                '        :data="dataTwo"',
                '        :sections="sectionsTwo"',
                '        title="Productivity"',
                '    />',
                '',
                '    <AwDashboardSpeed',
                '        :data="dataTwo"',
                '        :sections="sections"',
                '        title="Productivity"',
                '        :span="{ md: 1, lg: 1, xl: 1 }"',
                '    >',
                '        <template #footer>',
                '            <div class="flex justify-end my-4 px-4">',
                '                <a href="https://www.google.com" target="_blank">',
                '                    Footer link',
                '                </a>',
                '            </div>',
                '        </template>',
                '    </AwDashboardSpeed>',
                '</AwGrid>'
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
