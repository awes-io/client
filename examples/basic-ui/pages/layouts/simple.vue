<template>
    <AwPage title="Company">
        <template #buttons>
            <AwButton size="sm">Create Lead</AwButton>
        </template>

        <div class="bg-muted">
            <AwTableBuilder
                :collection="managers"
                :scroll-on-page="false"
                defaultHeight="50vh"
            >
                <AwTableCol field="id" />

                <AwTableCol
                    title="User name"
                    :orderable="{ templateValue: 'first_name' }"
                >
                    <template #default="{ cell }">
                        {{ cell.first_name }} {{ cell.last_name }}
                    </template>
                </AwTableCol>

                <AwTableCol title="Job title" field="position" />
            </AwTableBuilder>
        </div>
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
    name: 'SimpleLayout',

    layout: 'LayoutSimple',

    data() {
        return {
            managers: new Managers()
        }
    }
}
</script>
