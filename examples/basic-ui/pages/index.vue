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
            <AwHello />
        </AwGrid>
    </AwPage>
</template>

<script>
export default {
    name: 'Examples',

    data() {
        return {
            examples: [
                {
                    title: 'Buttons',
                    text: 'abc',
                    link: '/Buttons'
                },
                {
                    title: 'Charts',
                    text: 'abc'
                },
                {
                    title: '123',
                    text: 'abc'
                }
            ]
        }
    }
}
</script>
