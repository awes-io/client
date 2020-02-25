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

            <AwSearch name="search" class="my-3" />

            <AwTableBuilder
                @click:row="clickRow"
                :collection="managers"
                :watchParams="['search']"
                defaultHeight="50vh"
            >
                <AwTableCol vertical-align="top" field="id" />

                <AwTableCol title="User name">
                    <template #default="{ cell }">
                        {{ cell.first_name }} {{ cell.last_name }}
                    </template>
                </AwTableCol>

                <AwTableCol title="Job title" field="position" />

                <template #dropdown="{ cell }">
                    <AwDropdownButton text="First item" />
                    <AwDropdownButton text="Second item" />
                    <AwDropdownButton text="Third item" />

                    <AwDropdownButton
                        color="error"
                        text="Remove"
                        @click="managers.remove({ id: cell.id })"
                    />
                </template>
            </AwTableBuilder>

            <div class="mt-8">
                <p>
                    Component has <code>dropdown</code> slot. It is hidden by
                    default and when present - located in most right column.
                    Slot should contain list of items inside dropdown.<br />
                    For example:
                </p>

                <AwCodeSnippet v-text="codeDropdown" class="my-3" />
            </div>

            <AwCard title="NOTE" class="my-8 border-l-4 border-error">
                Click on any <code>button</code> or <code>a</code> elements that
                inside table row will not trigger <code>click:row</code> event.
                <br />This includes click on dropdown slot button aswell. <br />
                For example clicking on row in table below will trigger alert
            </AwCard>

            <AwTable
                :rows="rows"
                vertical-align="middle"
                @click:row="exampleClickRow"
            >
                <!-- https://tailwindcss.com/docs/word-break/#app -->
                <AwTableCol field="one" class="break-all" :priority="4" />
                <AwTableCol field="two with long name" title="Two">
                    <template #default>
                       <AwUserpic :src="undefined" name="Sds Max-Mustermann" />
                    </template>
                </AwTableCol>
                <AwTableCol field="three" title="Three" title-align="center">
                    <template #default>
                        <AwLink>Link</AwLink>
                    </template>
                </AwTableCol>
                <AwTableCol>
                    <template #default>
                        <AwButton>Button</AwButton>
                    </template>
                </AwTableCol>
            </AwTable>
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

    computed: {
        codeDropdown() {
            const arr = [
                '<AwTableBuilder :collection="managers">',
                '   <AwTableCol vertical-align="top" field="id" />',
                '   <AwTableCol title="Job title" field="position" />',
                '   <template #dropdown>',
                '       <AwButton theme="toggle" class="w-full" text="Remove" @click="remove" />',
                '       <AwButton theme="toggle" class="w-full" text="Second item" @click="handler" />',
                '   </template>',
                '</AwTableBuilder>'
            ]
            return arr.join('\n')
        }
    },

    methods: {
        clickRow(val) {
            console.log(val)
        },

        exampleClickRow() {
            alert('Row click')
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
