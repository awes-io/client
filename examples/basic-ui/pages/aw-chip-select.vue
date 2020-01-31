<template>
    <AwPage :title="headline">
        <h2>Appointments</h2>
        <AwTable :rows="appointments.models" verticalAlign="middle">
            <AwTableCol field="name" title="Event" />
            <AwTableCol field="client" title="Client" />
            <AwTableCol title="Status">
                <template #default="{ cell: appointment }">
                    <AwChipSelect
                        v-model="appointment.status"
                        :options="appointment.statuses"
                        :loading="appointment.loading"
                    />
                </template>
            </AwTableCol>
        </AwTable>
    </AwPage>
</template>

<script>
import { BaseModel, BaseCollection } from '@awes-io/vue-mc/dist/index.esm.js'

const EVENTS = [
    { name: 'Meeting', client: 'John Doe' },
    { name: 'Call', client: 'Jane Smith' }
]

class Appointement extends BaseModel {
    defaults() {
        return {
            status: 1,
            statuses: [
                { id: 1, text: 'New', color: 'info' },
                { id: 2, text: 'Pending', color: 'warning' },
                { id: 3, text: 'Active', color: 'success' },
                { id: 4, text: 'Removed', color: 'error' }
            ]
        }
    }
}

const appointments = new BaseCollection()

EVENTS.forEach(attributes => {
    const model = new Appointement(attributes)

    model.on('change', ({ attribute }) => {
        if (attribute === 'status') {
            model.loading = true
            // mock request
            setTimeout(() => {
                model.loading = false
            }, 2000)
        }
    })

    appointments.add(model)
})

export default {
    data() {
        return {
            title: 'AwChipSelect',
            headline: this._getTitle('AwChipSelect'),
            appointments
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
