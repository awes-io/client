<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 2, lg: 3 }">
            <AwDashboardLine
                :data="lineData"
                percent
                title="Регистрации"
                description="Заявок"
            />

            <AwDashboardLine
                :data="lineDatatwo"
                :colors="['green']"
                title="Регистрации"
                description="Заявок"
            />

            <AwDashboardLine
                :data="lineDatatwo"
                :colors="['#00f']"
                title="Регистрации"
                description="Заявок"
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
                        title: 'Успешных', // string
                        value: 265, // number
                        on_chart: true
                    },
                    {
                        title: 'Ожидает',
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
                        title: 'Успешных', // string
                        value: 200, // number
                        value_diff: -2, // number, при null не показывать, либо не передавать вовсе,
                        on_chart: true
                    },
                    {
                        title: 'Ожидает',
                        value: 60,
                        value_diff: 3,
                        on_chart: true
                    },
                    {
                        title: 'Отказ',
                        value: 15,
                        value_diff: 1,
                        on_chart: true
                    },
                    {
                        title: 'long long long long long long long',
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
                        title: 'long long long long long long long',
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
                '       title="Регистрации"',
                '       description="Заявок"',
                '   />',
                '',
                '   <AwDashboardLine',
                '       :data="lineDatatwo"',
                `       :colors="['green']"`,
                '       title="Регистрации"',
                '       description="Заявок"',
                '   />',
                '',
                '   <AwDashboardLine',
                '       :data="lineDatatwo"',
                `       :colors="['#00f']"`,
                '       title="Регистрации"',
                '       description="Заявок"',
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
