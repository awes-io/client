<template>
    <AwPage :title="headline">
        <div style="max-width: 400px">
            <AwDashboardDoughnut
                :data="lineDatatwo"
                percent
                title="Регистрации"
                description="Заявок"
            />
        </div>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwDashboardDoughnut',
            headline: this._getTitle('AwDashboardDoughnut'),
            lineData: {
                total: 340, // number
                total_diff: 20, // number
                elements: [
                    {
                        title: 'Успешных', // string
                        value: 240, // number
                        on_chart: true
                    },
                    {
                        title: 'Ожидает',
                        value: 100,
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

    head() {
        return {
            title: this._getMetaTitle(this.title),
            meta: [this._getMetaDescription(this.title)]
        }
    }
}
</script>
