<template>
    <AwPage :title="title" :subnav="subnav">
        <NuxtChild />
    </AwPage>
</template>

<script>
import { startsWith } from 'rambdax'
import { ucFirst } from '../assets/js/string'

const selectUrl = '/forms/select'
const selectSubnav = [
    { text: 'Select Text', href: `${selectUrl}/` },
    { text: 'Select Ajax', href: `${selectUrl}/ajax` },
    { text: 'Select Object', href: `${selectUrl}/object` }
]

export default {
    name: 'Forms',

    computed: {
        subnav() {
            return startsWith(selectUrl, this.$route.path)
                ? selectSubnav
                : undefined
        },

        title() {
            return this.$route.path
                .split('/')
                .filter(Boolean)
                .map(ucFirst)
                .join(' ')
        }
    }
}
</script>
