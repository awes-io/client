<template>
    <div class="container py-8">
        <h1 class="text-3xl mb-4">Fake {{ $route.params.service }}</h1>
        <p>...redirect in {{ sec }}</p>
    </div>
</template>

<script>
export default {
    name: 'FakeSocialLogin',

    auth: 'guest',

    layout: 'empty',

    data() {
        return {
            sec: 2
        }
    },

    mounted() {
        this.tick()
    },

    methods: {
        tick() {
            if (this.sec > 0) {
                this.sec = this.sec - 1
                setTimeout(this.tick, 1000)
            } else {
                this.$router.replace({
                    path: `/login/${this.$route.params.service}/callback`,
                    query: this.$route.query
                })
            }
        }
    }
}
</script>
