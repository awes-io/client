<template>
    <AwPage title="Tables">
        <section>
            <h2 class="h3">Managers</h2>

            <!-- @click:row="clickRow" -->
            <AwTableBuilder :collection="managers">
                <AwTableCol
                    field="first_name"
                    title="First name"
                    text-align="center"
                />
                <AwTableCol field="last_name" title="Last name" />
                <AwTableCol field="position" />
                <AwTableCol title="Status">
                    <template #default="{ cell }">
                        <AwChipSelect
                            v-model="cell.status"
                            :loading="managers.loading"
                            :options="[
                                { id: 1, text: 'New', color: 'info' },
                                { id: 2, text: 'Removed', color: 'error' },
                                { id: 3, text: 'Active', color: 'success' }
                            ]"
                        />
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
            fetch: 'api/managers',
            save: 'api/managers'
        }
    }
}

export default {
    name: 'TablePage',

    head() {
        return {
            title: 'AwTableBuilder'
        }
    },

    data() {
        return {
            managers: new Managers()
        }
    },

    methods: {
        clickRow(val) {
            alert(`Row click: ${JSON.stringify(val)}`)
        }
    }
}
</script>
