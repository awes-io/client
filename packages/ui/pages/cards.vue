<template>
    <AwPage title="AwCard" :fullscreen.sync="fullscreen">
        <template #buttons>
            <AwButton @click="fullscreen = !fullscreen" text="Go fullscreen" />
        </template>
        <AwGrid :col="{ md: 4 }">
            <AwCard background="transperent">
                Card #1<br />
                <small>Background: transperent</small>
            </AwCard>

            <AwCard title="Card #2">
                <small>Card with headline.</small>
            </AwCard>

            <AwCard title="Card #3" text="Short description">
                <small>With description and headline.</small>
            </AwCard>

            <AwCard title="Card #3" text="Short description" link="/">
                <small>With description and headline as a link.</small>
            </AwCard>
        </AwGrid>
    </AwPage>
</template>

<script>
export default {
    head() {
        return {
            title: 'AwCard'
        }
    },

    data() {
        return {
            fullscreen: false
        }
    }
}
</script>
