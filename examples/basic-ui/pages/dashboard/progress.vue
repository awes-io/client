<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 2, lg: 4 }">
            <AwDashboardProgress
                :data="dataOne"
                title="Registrations"
                description="Leads"
            />

            <AwDashboardProgress
                :data="dataTwo"
                hide-counter
                percent
                title="Registrations"
                description="Leads"
            />

            <AwDashboardProgress
                :data="dataTwo"
                hide-percent
                title="Registrations"
                description="Leads"
                :span="{ md: 2, lg: 2 }"
            />
        </AwGrid>

        <section class="mt-8">
            <AwCodeSnippet v-text="code" />

            <h5>Example data</h5>
            <AwCodeSnippet v-text="dataOne" language="javascript" />
        </section>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwDashboardProgress',
            headline: this._getTitle('AwDashboardProgress'),
            dataOne: {
                total: 340, // number
                total_diff: 20, // number
                elements: [
                    {
                        title: 'Succeeded', // string
                        value: 265, // number
                        on_chart: true
                    },
                    {
                        title: 'Awaiting',
                        value: 60,
                        on_chart: true
                    }
                ]
            },
            dataTwo: {
                total: 400, // number
                total_diff: 20, // number
                elements: [
                    {
                        title: 'Succeeded', // string
                        value: 200, // number
                        value_diff: 2, // number, при null не показывать, либо не передавать вовсе,
                        on_chart: true
                    },
                    {
                        title: 'Awaiting',
                        value: 60,
                        value_diff: 3,
                        on_chart: true
                    },
                    {
                        title: 'Declined',
                        value: 15,
                        value_diff: -1,
                        on_chart: true
                    },
                    {
                        title: 'Processed',
                        value: 20,
                        value_diff: 3,
                        on_chart: true
                    }
                ]
            }
        }
    },

    computed: {
        code() {
            const arr = [
                '<AwGrid :col="{ md: 2, lg: 4 }">',
                '    <AwDashboardProgress',
                '        :data="dataOne"',
                '        title="Registrations"',
                '        description="Leads"',
                '    />',
                '',
                '    <AwDashboardProgress',
                '        :data="dataTwo"',
                '        hide-counter',
                '        percent',
                '        title="Registrations"',
                '        description="Leads"',
                '    />',
                '',
                '    <AwDashboardProgress',
                '        :data="dataTwo"',
                '        title="Registrations"',
                '        description="Leads"',
                '        :span="{ md: 2, lg: 2 }"',
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
