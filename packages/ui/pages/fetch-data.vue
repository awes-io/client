<template>
    <AwPage title="AwContentWrapper">
        <AwFetchData
            :watch-params="['test']"
            url="http://localhost:3000/api/managers/1"
            style="min-height: 10vh"
        >
            <template #default="{ data }">
                {{ data }}
            </template>
        </AwFetchData>
    </AwPage>
</template>

<script>
export default {
    name: 'ContentWrapper'
}
</script>
