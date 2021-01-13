<template>
    <span></span>
</template>

<script>
export default {
    name: 'Index',

    asyncData({ redirect }) {
        redirect('/overview')
    }
}
</script>
