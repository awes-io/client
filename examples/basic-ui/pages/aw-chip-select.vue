<template>
    <AwPage :title="headline">
        <!-- <AwTable :rows="appointments.models" verticalAlign="middle">
            <AwTableCol field="name" title="Event" />
            <AwTableCol field="client" title="Client" />
            <AwTableCol title="Status">
                <template #default="{ cell: appointment }">
                    <AwChipSelect
                        v-model="appointment.status"
                        :options="appointment.statuses"
                        filled
                    />
                </template>
            </AwTableCol>
        </!-->

        <h2>Chip select</h2>

        <AwChipSelect v-model="standart" :options="statuses" />

        <AwCodeSnippet v-text="code" class="mt-3" :size="50" />

        <h2>Filled</h2>

        <AwChipSelect v-model="filled" :options="statuses" filled />

        <AwCodeSnippet v-text="filledCode" class="mt-3" :size="50" />

        <h2>ID as String</h2>

        <AwChipSelect v-model="typesVal" :options="typesOptions" />

        <AwCodeSnippet v-text="typesCode" class="mt-3" />

        <h2>Loading</h2>

        <AwChipSelect v-model="typesVal" :options="typesOptions" loading />
    </AwPage>
</template>

<script>
import { BaseModel, BaseCollection } from '@awes-io/vue-mc'

const EVENTS = [
    { name: 'Meeting', client: 'John Doe' },
    { name: 'Call', client: 'Jane Smith' }
]

const statuses = [
    { id: 1, text: 'New', color: 'info', icon: 'plus-solid' },
    {
        id: 2,
        text: 'Removed',
        color: 'error',
        icon: 'close-solid'
    },
    {
        id: 3,
        text: 'Active',
        color: 'success',
        icon: 'check-solid'
    },
    {
        id: 5,
        text: 'In Work',
        color: 'link',
        icon: 'pie-chart-empty'
    },
    {
        id: 6,
        text: 'Error',
        color: 'error',
        icon: 'attention'
    },
    {
        id: 7,
        text: 'Pause',
        color: 'warning',
        icon: 'pause'
    },
    {
        id: 8,
        text: 'In progress',
        color: 'link',
        icon: 'progress'
    }
]

const typesOptions = [
    {
        id: null,
        text: 'No selected'
    },
    {
        id: 'removed',
        text: 'Removed'
    },
    {
        id: 'active',
        text: 'Active'
    }
]

class Appointement extends BaseModel {
    defaults() {
        return {
            status: 1,
            statuses: statuses
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
            appointments,
            statuses: [...statuses],
            standart: 1,
            filled: 1,
            typesOptions: typesOptions,
            typesVal: null
        }
    },

    computed: {
        code() {
            const arr = [
                '<AwChipSelect',
                '   :options="[',
                "       {id: 1, text: 'New', color: 'info', icon: 'plus-solid'}",
                "       {id: 2, text: 'Removed', color: 'error', icon: 'close-solid'}",
                "       {id: 3, text: 'Active', color: 'success', icon: 'check-solid'}",
                "       {id: 5, text: 'In Work', color: 'link', icon: 'pie-chart-empty'},",
                "       {id: 6, text: 'Error', color: 'error', icon: 'attention'},",
                "       {id: 7, text: 'Pause', color: 'warning', icon: 'pause'},",
                "       {id: 8, text: 'In progress', color: 'link', icon: 'progress'},",
                '   ]"',
                '/>'
            ]
            return arr.join('\n')
        },

        filledCode() {
            const arr = [
                '<AwChipSelect',
                '   :options="options"',
                '   filled',
                '/>'
            ]
            return arr.join('\n')
        },

        typesCode() {
            const arr = [
                '<AwChipSelect',
                '   :options="[',
                '       { id: null, text: No selected},',
                "       { id: 'removed', text: 'Removed' }",
                "       { id: 'active', text: 'Active' }",
                '   ]"',
                '/>'
            ]
            return arr.join('\n')
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
