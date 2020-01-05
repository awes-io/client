<template>
    <AwPage :title="headline">
        <!-- default usage -->
        <AwTimelineBuilder :collection="activityCollection" />

        <!-- customization -->
        <AwTimelineBuilder :collection="activityCollection" class="mt-8">
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
import activityCollection from './../tests/mock/activity-collection'

export default {
    name: 'Timeline',

    data() {
        return {
            title: 'AwTimelineBuilder',
            headline: this._getTitle('AwTimelineBuilder'),
            activityCollection
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
