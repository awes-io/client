<template>
    <AwPage title="Tags">
        <AwTags tags="1, 2, 3, 4" />
        <br />
        <AwTags tags="one, two, three, four" />
        <br />
        <AwTags tags="one,two,three,four" />
        <br />
        <AwTags :tags="['one', 'two', 'three', 'four']" @click="log" />
    </AwPage>
</template>

<script>
export default {
    name: 'TagsPage',

    methods: {
        log() {
            console.log(arguments)
        }
    }
}
</script>
