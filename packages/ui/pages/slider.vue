<template>
    <AwPage title="AwSlider">
        <AwSlider>
            <a
                href="/"
                v-for="i in 10"
                :key="i"
                class="px-4 py-2"
                @click.prevent="log"
            >
                item-{{ i }}
            </a>
        </AwSlider>
    </AwPage>
</template>

<script>
export default {
    name: 'SliderPage',

    head() {
        return {
            title: 'AwSlider'
        }
    },

    methods: {
        log() {
            alert('link')
        }
    }
}
</script>
