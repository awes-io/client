<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 2, lg: 2, xl: 3 }">
            <AwDashboardDonut
                :data="data"
                percent
                title="Registrations"
                description="Leads"
            />

            <AwDashboardDonut
                :data="dataTwo"
                percent
                title="Registrations"
                description="Leads"
            />

            <AwDashboardDonut
                :data="data"
                :span="{ md: 2, lg: 2, xl: 1 }"
                :colors="['green', 'blue']"
                percent
                title="Registrations"
                description="Leads"
            />
        </AwGrid>

        <section class="mt-8">
            <AwCodeSnippet v-text="code" />

            <h5>Example data</h5>
            <AwCodeSnippet v-text="data" language="javascript" />

            <h5>Example data</h5>
            <AwCodeSnippet v-text="dataTwo" language="javascript" />
        </section>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwDashboardDonut',
            headline: this._getTitle('AwDashboardDonut'),
            data: {
                total: 215, // number
                total_diff: 20, // number
                elements: [
                    {
                        title: 'Success', // string
                        value: 150, // number
                        on_chart: true
                    },
                    {
                        title: 'In progress',
                        value: 65,
                        on_chart: true
                    }
                ]
            },
            dataTwo: {
                total: 340, // number
                total_diff: 20, // number
                elements: [
                    {
                        title: 'Success', // string
                        value: 200, // number
                        value_diff: -2, // number, when null don't show
                        on_chart: true
                    },
                    {
                        title: 'In progress',
                        value: 60,
                        value_diff: 3,
                        on_chart: true
                    },
                    {
                        title: 'Declined',
                        value: 15,
                        value_diff: 1,
                        on_chart: true
                    },
                    {
                        title:
                            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                        value: 20,
                        value_diff: 3,
                        on_chart: true
                    },
                    {
                        title: 'test2',
                        value: 30,
                        on_chart: true
                    },
                    {
                        title:
                            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                        value: 20,
                        value_diff: 3,
                        on_chart: true
                    },
                    {
                        title: 'test2',
                        value: 30,
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
                '    <AwDashboardDonut',
                '        :data="data"',
                '        percent',
                '        title="Registrations"',
                '        description="Leads"',
                '    />',
                '',
                '    <AwDashboardDonut',
                '        :data="dataTwo"',
                '        percent',
                '        title="Registrations"',
                '        description="Leads"',
                '    />',
                '',
                '    <AwDashboardDonut',
                '        :data="data"',
                '        :span="{ md: 2, lg: 2, xl: 1 }"',
                `        :colors="['green', 'blue']"`,
                '        percent',
                '        title="Registrations"',
                '        description="Leads"',
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
