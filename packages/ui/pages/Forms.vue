<template>
    <main>
        <!-- form control -->
        <div class="border mb-8 p-4">
            <p class="font-bold">Loading:</p>
            <div class="flex -mx-2">
                <div class="p-2 flex-1">
                    <AwCheckbox
                        :label="`Turn ${loading ? 'off' : 'on'} loading state`"
                        v-model="loading"
                    />
                </div>
                <div class="p-2 flex-1">
                    <AwInput label="Loading text" v-model="loadingText" />
                </div>
            </div>
            <hr class="my-4" />
            <p class="font-bold">Method:</p>
            <div class="flex -mx-2">
                <div
                    class="p-2 flex-1"
                    v-for="m in ['GET', 'PUT', 'POST', 'DELETE']"
                    :key="m"
                >
                    <AwRadio :label="m" v-model="method" :value="m" />
                </div>
            </div>
            <hr class="my-4" />
            <p class="font-bold">Respond with:</p>
            <div class="flex -mx-2">
                <div class="p-2 flex-1">
                    <AwRadio
                        label="Success"
                        v-model="response"
                        value="success"
                    />
                </div>
                <div class="p-2 flex-1">
                    <AwRadio label="Error" v-model="response" value="error" />
                </div>
            </div>
        </div>

        <!-- form example -->
        <div class="flex -mx-2">
            <div class="p-2 md:w-1/3">
                <p class="h3 mb-4">Form</p>
                <AwForm
                    ref="form"
                    :method="method"
                    :url="_url"
                    @sended="recieved = $event"
                    @error="recieved = $event"
                >
                    <AwInput name="name" label="Name" />
                    <AwPassword class="mt-2" name="password" label="Password" />
                    <AwUploader
                        name="file"
                        url="//httpbin.org/post"
                        class="mt-2"
                        :get-file-id="() => new Date().getTime()"
                        multiple
                    />
                    <AwButton
                        class="mt-2"
                        type="submit"
                        :data-loading="loadingText"
                    >
                        Submit
                    </AwButton>
                </AwForm>
            </div>
            <div class="p-2 md:w-2/3 overflow-x-auto">
                <p class="h3 mb-4">Response</p>
                <pre>{{ recieved }}</pre>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: 'FormsPage',

    data() {
        return {
            loading: false,
            loadingText: 'Loading...',
            method: 'POST',
            response: 'success',
            errors: null,
            recieved: {}
        }
    },

    computed: {
        _url() {
            return this.response === 'error'
                ? '/api/errors'
                : `//httpbin.org/${this.method.toLowerCase()}`
        }
    },

    watch: {
        loading(isLoading) {
            this.$refs.form.loading = isLoading
        }
    }
}
</script>
