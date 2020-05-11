<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 2, lg: 3 }">
            <AwDashboardLine
                :data="lineData"
                percent
                title="Registrations"
                description="Leads"
            />

            <AwDashboardLine
                :data="lineDatatwo"
                :colors="['green']"
                title="Registrations"
                description="Leads"
            />

            <AwDashboardLine
                :data="lineDatatwo"
                :colors="['#00f']"
                percent
                title="Registrations"
                description="Leads"
            />
        </AwGrid>

        <section class="mt-8">
            <AwCodeSnippet v-text="code" />

            <h5>Example data</h5>
            <AwCodeSnippet v-text="lineData" language="javascript" />
        </section>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwDashboardLine',
            headline: this._getTitle('AwDashboardLine'),
            lineData: {
                total: 340, // number
                total_diff: 20, // number
                elements: [
                    {
                        title: 'Success', // string
                        value: 265, // number
                        on_chart: true
                    },
                    {
                        title: 'In progress',
                        value: 60,
                        on_chart: true
                    }
                ]
            },
            lineDatatwo: {
                total: 340, // number
                total_diff: 20, // number
                elements: [
                    {
                        title: 'Success', // string
                        value: 200, // number
                        value_diff: -2, // number, при null не показывать, либо не передавать вовсе,
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
                '<AwGrid :col="{ md: 2, lg: 3 }">',
                '   <AwDashboardLine',
                '       :data="lineData"',
                '       percent',
                '       title="Registrations"',
                '       description="Leads"',
                '   />',
                '',
                '   <AwDashboardLine',
                '       :data="lineDatatwo"',
                `       :colors="['green']"`,
                '       title="Registrations"',
                '       description="Leads"',
                '   />',
                '',
                '   <AwDashboardLine',
                '       :data="lineDatatwo"',
                `       :colors="['#00f']"`,
                '       title="Registrations"',
                '       description="Leads"',
                '   />',
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
