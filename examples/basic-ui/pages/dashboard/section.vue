<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 2, lg: 2, xl: 3 }">
            <AwDashboardSection
                :data="data"
                title="Registrations"
                description="Registrations yesterday"
            />

            <AwDashboardSection
                :data="data"
                border-color="#45A4DC"
                show-axis-legend
                title="Registrations"
                description="Registrations yesterday"
            />

            <AwDashboardSection
                :data="data"
                :span="{ md: 2, lg: 2, xl: 1 }"
                border-color="#45A4DC"
                background-color="rgba(69,164,220, 0.3)"
                title="Registrations"
                description="Registrations yesterday"
            />
        </AwGrid>

        <section class="mt-8">
            <AwCodeSnippet v-text="code" />

            <h5>Example data</h5>
            <AwCodeSnippet v-text="data" language="javascript" />
        </section>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwDashboardSection',
            headline: this._getTitle('AwDashboardSection'),
            data: {
                total: 340, // number
                total_diff: 20, // number
                elements: [
                    {
                        title: '06:00', // string
                        value: 0, // number
                        on_chart: true
                    },
                    {
                        title: '08:00',
                        value: 0,
                        on_chart: true
                    },
                    {
                        title: '10:00',
                        value: 0,
                        on_chart: true
                    },
                    {
                        title: '12:00.',
                        value: 5,
                        on_chart: true
                    },
                    {
                        title: '14:00',
                        value: 44,
                        on_chart: true
                    },
                    {
                        title: '16:00',
                        value: 20,
                        on_chart: true
                    },
                    {
                        title: '18:00',
                        value: 30,
                        on_chart: true
                    },
                    {
                        title: '20:00',
                        value: 44,
                        on_chart: true
                    },
                    {
                        title: '22:00',
                        value: 48,
                        on_chart: true
                    }
                ]
            }
        }
    },

    computed: {
        code() {
            const arr = [
                '<AwGrid :col="{ md: 2, lg: 2, xl: 3 }">',
                '    <AwDashboardSection',
                '        :data="data"',
                '        title="Registrations"',
                '        description="Registrations yesterday"',
                '    />',
                '',
                '    <AwDashboardSection',
                '        :data="data"',
                '        border-color="#45A4DC"',
                '        show-axis-legend',
                '        title="Registrations"',
                '        description="Registrations yesterday"',
                '    />',
                '',
                '    <AwDashboardSection',
                '        :data="data"',
                '        :span="{ md: 2, lg: 2, xl: 1 }"',
                '        border-color="#45A4DC"',
                '        background-color="rgba(69,164,220, 0.3)"',
                '        title="Registrations"',
                '        description="Registrations yesterday"',
                '    />',
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
