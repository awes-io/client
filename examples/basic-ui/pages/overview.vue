<template>
    <AwPage title="Overview">
        <AwGrid :col="{ md: 4 }">
            <AwCard
                v-for="example in examples"
                :key="example.title"
                v-bind="example"
            />
        </AwGrid>
    </AwPage>
</template>

<script>
import { navigation } from '../config/navigation'
import { urlify } from '~/assets/js/url'

export default {
    name: 'Overview',

    computed: {
        examples() {
            return navigation.map(
                ({ title = '', description = '', url = '' }) => ({
                    title,
                    text: description,
                    link: url
                })
            )
        }
    },
    asyncData({ env }) {
        console.log(process.env)
    }
}
</script>
