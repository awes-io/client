<template>
    <AwPage title="Tables">
        <template #buttons>
            <AwButton text="Toggle" @click="showTable = !showTable" />
            <AwButton text="Fetch" class="ml-4" @click="managers.fetch" />
        </template>
        <section>
            <h2 class="h3">Managers</h2>

            <!-- @click:row="clickRow" -->
            <AwTableBuilder v-if="showTable" :collection="managers" no-fetch>
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
            <div v-else>
                <pre v-for="model in managers.models" :key="model.id">{{
                    model._attributes
                }}</pre>
            </div>
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
            managers: new Managers(),
            showTable: true
        }
    },

    methods: {
        clickRow(val) {
            alert(`Row click: ${JSON.stringify(val)}`)
        }
    }
}
</script>
