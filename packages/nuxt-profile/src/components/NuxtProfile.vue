<template>
    <div class="the-example">
        {{ message }}
    </div>
</template>

<script>
export default {
    name: 'TheExample',

    props: {
        message: {
            type: String,
            default: 'Hello world!'
        }
    }
}
</script>
