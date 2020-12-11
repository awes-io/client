<template>
    <AwPage>
        <AwUploader url="//httpbin.org/post" multiple />

        <AwUploader
            v-if="show"
            url="//httpbin.org/post"
            :format="['.png', '*.jpg', 'jpeg']"
            class="mt-4"
        />

        <AwButton text="toggle" class="mt-4" @click="show = !show" />
    </AwPage>
</template>

<script>
export default {
    name: 'UploaderPage',

    data() {
        return {
            show: true
        }
    }
}
</script>
