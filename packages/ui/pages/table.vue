<template>
    <AwPage title="Tables">
        <section>
            <h2 class="h3">Table simple</h2>

            <div class="aw-button-group my-4">
                <AwButton text="Add" @click="addColumn" />
                <AwButton text="Remove" @click="removeColumn" />
            </div>

            <AwTable :rows="rows" vertical-align="middle">
                <!-- https://tailwindcss.com/docs/word-break/#app -->
                <AwTableCol field="one" class="break-all" :priority="5" />
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
                <AwTableCol field="one" class="break-all" />
            </AwTable>
        </section>

        <section class="mt-8">
            <h2 class="h3" v-pre>
                Table without head - pass an empty &lt;thead&gt; element to
                <code class="code">thead</code> slot
            </h2>

            <AwTable :rows="rows" @click:row="clickRow">
                <template #thead>
                    <thead></thead>
                </template>
            </AwTable>
        </section>

        <section class="mt-8">
            <h2 class="h3">Pagination simple</h2>

            <AwInput
                v-model.number="pagination.total"
                label="Total"
                class="mt-4"
            />
            <AwInput
                v-model.number="pagination.limit"
                label="Limit"
                class="mt-4"
            />
            <AwCheckbox v-model="limits" label="Limits" class="mt-2" />

            <AwPagination
                class="mt-4"
                v-bind="pagination"
                :limits="limits ? [15, 50, 100] : undefined"
                @click:page="pagination.page = $event"
                @click:limit="pagination.limit = $event"
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
            pagination: {
                page: 1,
                total: 1000,
                limit: 15
            },
            limits: true,
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
                },
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
        },

        addColumn() {
            this.rows.push({
                one: 'Pushed',
                'two with long name': 'Pushed <br>ipsum dolor sit amet.',
                three: 'Three Pushed',
                bla: 'undefined'
            })
        },

        removeColumn() {
            this.rows.pop()
        }
    }
}
</script>
