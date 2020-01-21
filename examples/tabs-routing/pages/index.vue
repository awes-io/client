<template>
    <AwPage title="RouterTest" :subnav="subnav">
        <NuxtChild />
    </AwPage>
</template>

<script>
export default {
    name: 'Homepage',

    computed: {
        subnav() {
            return [
                {
                    text: 'Home',
                    href: this.localePath({ path: '/' })
                },
                {
                    text: 'Filtered one',
                    href: {
                        path: this.localePath({ path: '/filtered' }),
                        query: { one: '1', two: null }
                    }
                },
                {
                    text: 'Filtered two',
                    href: {
                        path: this.localePath({ path: '/filtered' }),
                        query: { one: null, two: '1' }
                    }
                },
                {
                    text: 'Other',
                    href: {
                        path: this.localePath({ path: '/other' }),
                        query: { param: 'value' }
                    }
                }
            ]
        }
    }
}
</script>
