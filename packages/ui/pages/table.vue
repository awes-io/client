<template>
    <AwPage title="Tables">
        <section>
            <h2 class="h3">Table simple</h2>

            <AwTable :rows="rows" vertical-align="middle">
                <!-- https://tailwindcss.com/docs/word-break/#app -->
                <AwTableCol field="one" class="break-all" :priority="4" />
                <AwTableCol
                    field="two with long name"
                    title="Two"
                    vertical-align="top"
                />
                <AwTableCol field="three" title="Three" title-align="center" />
                <AwTableCol>
                    <template #default="{ cell }">
                        {{ cell.one }} / <span v-html="cell.three"></span>
                    </template>
                </AwTableCol>
            </AwTable>
        </section>

        <section class="mt-8">
            <h2 class="h3" v-pre>
                Table without head - pass an empty &lt;thead&gt; element to
                <code class="code">thead</code> slot
            </h2>

            <AwTable :rows="rows">
                <template #thead>
                    <thead></thead>
                </template>
            </AwTable>
        </section>

        <section class="mt-8">
            <h2 class="h3">Pagination simple</h2>

            <AwPagination
                class="mt-4"
                :total="1000"
                page-param="_page"
                limit-param="_limit"
            />
        </section>
    </AwPage>
</template>

<script>
export default {
    name: 'TablePage',

    head() {
        return {
            title: 'AwTableBuilder'
        }
    },

    data() {
        return {
            rows: [
                {
                    one: 'Lorem ipsum dolor sit amet.',
                    'two with long name': 'Two',
                    three: '<strong>Three</strong>',
                    bla: null
                },
                {
                    one: 'One',
                    'two with long name': 'Lorem <br>ipsum dolor sit amet.',
                    three: 'Three',
                    bla: undefined
                }
            ]
        }
    },

    methods: {
        clickRow(val) {
            console.log(val)
        }
    }
}
</script>
