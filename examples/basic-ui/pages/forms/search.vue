<template>
    <div>
        <div class="flex mb-4">
            <div class="bg-gray-400 h-12">
                <AwButtonNav :items="filters" />
            </div>
            <div class="ml-auto flex bg-gray-500 h-12">
                <AwButton @click="clear" text="Clear" />
                <AwSearch name="search" />
            </div>
        </div>
        <div class="flex mb-4">
            <div class="w-full bg-gray-500 h-12">
                <AwTable :rows="rows">
                    <AwTableCol field="one" />
                    <AwTableCol field="two with long name" title="Two" />
                    <AwTableCol
                        field="three"
                        title="Three"
                        title-align="center"
                    />
                    <AwTableCol>
                        <template #default="{ cell }">
                            {{ cell.one }} / <span v-html="cell.three"></span>
                        </template>
                    </AwTableCol>
                </AwTable>
            </div>
        </div>
    </div>
</template>

<script>
import { isEmpty } from 'rambdax'

export default {
    name: 'SelectSearchPage',

    data() {
        return {
            disabled: false,
            options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven'],
            selected: 'three',
            filters: [
                { text: 'Order default', href: { query: { orderBy: null } } },
                { text: 'Order by name', href: { query: { orderBy: 'name' } } },
                { text: 'Order by id', href: { query: { orderBy: 'id' } } }
            ],
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
        clear() {
            if (!isEmpty(this.$route.query)) {
                this.$router.push({ path: this.$route.path })
            }
        }
    }
}
</script>
