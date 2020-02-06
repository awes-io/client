<template>
    <AwPage :title="headline">
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

            <AwPagination class="mt-4" :page="8" :limit="15" :total="150" />
        </section>

        <section class="mt-8">
            <h2 class="h3">Table builder with Vue-MC</h2>

            <h6>Filter by first name</h6>

            <AwSearch name="search" class="my-3"/>

            <AwTableBuilder
                @click:row="clickRow"
                :collection="managers"
                :watchParams="['search']"
                defaultHeight="70vh"
            >
                <AwTableCol vertical-align="top" field="id" />

                <AwTableCol title="User name">
                    <template #default="{ cell }">
                        {{ cell.first_name }} {{ cell.last_name }}
                    </template>
                </AwTableCol>

                <AwTableCol title="Job title" field="position" />

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
                                    theme="toggle"
                                    class="w-full text-error text-left"
                                    text="Remove"
                                    @click="managers.remove({ id: cell.id })"
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
import { BaseModel, BaseCollection } from '@awes-io/vue-mc'

class Managers extends BaseCollection {
    model() {
        return BaseModel
    }

    routes() {
        return {
            fetch: 'api/managers'
        }
    }
}

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
            managers: new Managers()
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
