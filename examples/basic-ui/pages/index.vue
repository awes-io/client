<template>
    <AwPage title="Examples">
        <AwGrid :col="{ md: 4 }">
            <AwCard
                v-for="example in examples"
                v-bind:key="example.title"
                :title="example.title"
                :text="example.text"
                :link="example.link || ''"
            />
        </AwGrid>
        <p>adsasd: <AwXxx /></p>
    </AwPage>
</template>

<script>
import { navigation } from '../config/navigation'

export default {
    name: 'Examples',

    computed: {
        examples() {
            let items = []
            for (var i = 0; i < navigation.length; i++) {
                items.push({
                    title: navigation[i].title,
                    text: navigation[i].description,
                    link: '/' + navigation[i].title.toLowerCase()
                })
            }
            return items
        }
    }
}
</script>
