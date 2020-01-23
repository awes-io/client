<template>
    <AwPage title="Multiblocks">
        <AwMultiBlockBuilder title="Manager" :collection="managers">
            <template #default="{ model }">
                <AwInput
                    v-model="model.first_name"
                    :error="model.errors.first_name"
                    label="First name"
                />
                <AwInput
                    v-model="model.last_name"
                    :error="model.errors.last_name"
                    label="Last name"
                    class="mt-4"
                />
            </template>
        </AwMultiBlockBuilder>

        <section class="mt-8">
            <h3>Managers table</h3>

            <AwTableBuilder :collection="managers">
                <AwTableCol field="$.first_name" title="First name" />
                <AwTableCol field="$.last_name" title="Last name" />
                <AwTableCol field="$.position" title="Position" />
                <AwTableCol field="$.phones" title="Phones">
                    <template #default="{ cell }">
                        <template v-for="(phone, i) in cell">
                            <template v-if="i > 0">,</template>
                            <AwLink :key="phone" :href="`tel:${phone}`">
                                {{ phone }}
                            </AwLink>
                        </template>
                    </template>
                </AwTableCol>
            </AwTableBuilder>
        </section>
    </AwPage>
</template>

<script>
import { Model, Collection } from 'vue-mc'

class Manager extends Model {
    defaults() {
        return {
            id: null,
            first_name: '',
            last_name: '',
            position: 'Employee',
            email: '',
            phones: []
        }
    }

    mutations() {
        return {
            id: id => Number(id),
            first_name: String,
            last_name: String,
            position: String,
            email: String,
            phones: phones =>
                Array.isArray(phones)
                    ? phones.filter(Boolean).map(String)
                    : phones
                    ? [String(phones)]
                    : []
        }
    }

    routes() {
        return {
            fetch: 'api/managers/{id}',
            save: 'api/managers'
        }
    }
}

class Managers extends Collection {
    model() {
        return Manager
    }

    routes() {
        return {
            fetch: 'api/managers',
            save: 'api/managers'
        }
    }

    getModelsFromResponse(response) {
        return response.getData().data
    }
}

export default {
    name: 'MultiblocksPage',

    data: () => ({
        managers: new Managers()
    })
}
</script>
