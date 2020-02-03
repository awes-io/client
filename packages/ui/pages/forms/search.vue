<template>
    <div>
        <AwGrid :col="{ lg: 2 }">
            <AwButtonNav :items="filters" />
            <div class="flex lg:justify-end">
                <AwButton @click="clear" text="Clear" size="sm" class="mr-2" />
                <AwSearch name="search" />
            </div>
        </AwGrid>
        <div class="mt-4">
            <div class="w-full bg-gray-500">
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
        <div class="mt-4">
            <AwInput label="Test global key" />
            <AwTextarea label="Test global key" class="mt-2" />
        </div>
    </div>
</template>

<script>
import { isEmpty } from 'rambdax'

export default {
    name: 'SelectSearchPage',

    head() {
        return {
            title: 'AwSearch'
        }
    },

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
