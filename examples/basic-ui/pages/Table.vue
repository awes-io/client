<template>
    <AwPage :title="headline">
        <section>
            <h2 class="h3">Table simple</h2>

            <AwTable :rows="rows">
                <!-- https://tailwindcss.com/docs/word-break/#app -->
                <AwTableCol field="one" class="break-all" :priority="4" />
                <AwTableCol field="two with long name" title="Two" />
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

        <section class="mt-8">
            <h2 class="h3">Table builder with Vue-MC</h2>

            <AwTableBuilder @click:row="clickRow" :collection="tasksCollection">
                <AwTableCol field="id" />

                <AwTableCol visible="md" title="User name" field="name" />

                <AwTableCol
                    visible="lg"
                    title-align="center"
                    vertical-align="center"
                    field="done"
                    class="text-center"
                >
                    <template #default="{ cell: done }">
                        <AwChip
                            :color="done ? 'disabled' : 'error'"
                            :fill="!done"
                            :icon="done ? 'check' : 'close'"
                        >
                            {{ done ? 'Yes' : 'No' }}
                        </AwChip>
                    </template>
                </AwTableCol>

                <AwTableCol title="Empty" field="null" />

                <AwTableCol class="text-center">
                    <template #default="{ cell }">
                        <AwButton
                            theme="icon"
                            icon="more"
                            :text="`Change item ${cell.id}`"
                            @click="$refs[`drop-${cell.id}`].toggle()"
                        />
                        <AwDropdown
                            :ref="`drop-${cell.id}`"
                            close-on-action
                            class="w-20"
                        >
                            <AwGrid :gap="0">
                                <AwButton
                                    class="w-full text-left"
                                    theme="toggle"
                                    :text="
                                        cell.done ? 'Mark undone' : 'Mark done'
                                    "
                                    @click="cell.done = !cell.done"
                                />
                                <AwButton
                                    theme="toggle"
                                    class="w-full text-error text-left"
                                    text="Remove"
                                    @click="
                                        tasksCollection.remove({ id: cell.id })
                                    "
                                />
                            </AwGrid>
                        </AwDropdown>
                    </template>
                </AwTableCol>
            </AwTableBuilder>
        </section>
    </AwPage>
</template>

<script>
import tasksCollection from './../tests/mock/tasks-collection'

export default {
    name: 'TablePage',

    data() {
        return {
            title: 'AwTableBuilder',
            headline: this._getTitle('AwTableBuilder'),
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
            ],
            tasksCollection
        }
    },

    methods: {
        clickRow(val) {
            console.log(val)
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
