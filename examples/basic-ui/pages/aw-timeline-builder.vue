<template>
    <AwPage :title="headline">
        <!-- default usage -->
        <AwTimelineBuilder :collection="records" />

        <!-- customization -->
        <AwTimelineBuilder :collection="records" class="mt-8">
            <template #default="{title, subtitle, author, createdAt}">
                <ul>
                    <li>{{ title }}</li>
                    <li>{{ subtitle }}</li>
                    <li>{{ author }}</li>
                    <li>{{ createdAt }}</li>
                </ul>
            </template>
        </AwTimelineBuilder>
    </AwPage>
</template>

<script>
import { BaseModel, BaseCollection } from '@awes-io/vue-mc/dist/index.esm.js'

class Records extends BaseCollection {
    model() {
        return BaseModel
    }

    routes() {
        return {
            fetch: 'api/records'
        }
    }
}

export default {
    name: 'Timeline',

    data() {
        return {
            title: 'AwTimelineBuilder',
            headline: this._getTitle('AwTimelineBuilder'),
            records: new Records()
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
