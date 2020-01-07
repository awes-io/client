<template>
    <AwPage title="AwTimelineBuilder">
        <!-- default usage -->
        <!-- <AwTimelineBuilder :collection="activityCollection" /> -->

        <!-- customization -->
        <!-- <AwTimelineBuilder :collection="activityCollection" class="mt-8">
            <template #default="{title, subtitle, author, createdAt}">
                <ul>
                    <li>{{ title }}</li>
                    <li>{{ subtitle }}</li>
                    <li>{{ author }}</li>
                    <li>{{ createdAt }}</li>
                </ul>
            </template>
        </AwTimelineBuilder> -->
    </AwPage>
</template>

<script>
export default {
    name: 'Timeline',

    head() {
        return {
            title: 'AwTimelineBuilder'
        }
    }
}
</script>
