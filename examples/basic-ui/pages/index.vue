<template>
    <AwPage title="Examples">
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
    name: 'Examples',

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
    }
}
</script>
