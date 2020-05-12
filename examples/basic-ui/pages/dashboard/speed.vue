<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 2, lg: 4 }">
            <AwDashboardSpeed
                :data="data"
                :sections="sections"
                title="Productivity"
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
                        value: 120,
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
                '        title="Регистрации"',
                '        description="Заявок"',
                '    />',
                '',
                '    <AwDashboardProgress',
                '        :data="dataTwo"',
                '        hide-counter',
                '        percent',
                '        title="Регистрации"',
                '        description="Заявок"',
                '    />',
                '',
                '    <AwDashboardProgress',
                '        :data="dataTwo"',
                '        title="Регистрации"',
                '        description="Заявок"',
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
