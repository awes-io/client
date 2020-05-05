<template>
    <AwPage title="Welcome">
        <AwTable :rows="appointmnets">
            <AwTableCol field="name" />
            <AwTableCol title="Status">
                <template #default="{ cell }">
                    <AwChipSelect
                        v-if="$can('manage', 'Appointments')"
                        v-model="cell.status"
                        :options="statuses"
                    />
                    <AwChip v-else v-bind="getChipProps(cell.status)" />
                </template>
            </AwTableCol>
            <AwTableCol field="price" />
        </AwTable>
    </AwPage>
</template>

<script>
export default {
    name: 'Homepage',

    data() {
        return {
            appointmnets: [
                { name: 'One', status: 1, price: '100$' },
                { name: 'Two', status: 3, price: '120$' },
                { name: 'Three', status: 2, price: '150$' },
                { name: 'Four', status: 1, price: '120$' }
            ],
            statuses: [
                { id: 1, text: 'Active', color: 'info', icon: 'circle' },
                {
                    id: 2,
                    text: 'Success',
                    color: 'success',
                    icon: 'check'
                },
                { id: 3, text: 'Fail', color: 'error', icon: 'close' }
            ]
        }
    },

    methods: {
        getChipProps(id) {
            return this.statuses.find(props => props.id === id)
        }
    }
}
</script>
