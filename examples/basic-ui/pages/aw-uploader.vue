<template>
    <AwPage :title="headline">
        <AwUploader
            name="file"
            url="/api/gallery/upload"
            class="mt-2"
            multiple
            @start="setFile"
            @progress="setLoading"
            @finish="addImage"
            @error="showError"
        />

        <!-- media gallery -->
        <AwGrid :col="{ default: 2, md: 3, xl: 4 }" class="mt-4">
            <div
                v-for="(src, i) in files"
                :key="src"
                class="relative overflow-hidden shadow group"
                style="height: 0; padding-bottom: 56.25%;"
            >
                <img
                    :src="src"
                    :alt="`media-${i}`"
                    class="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div
                    class="absolute inset-0 p-1 flex flex-wrap items-end justify-end opacity-0 group-hover:opacity-100"
                >
                    <div class="absolute inset-0 bg-overlay opacity-60"></div>
                    <div
                        class="absolute top-0 left-0 py-1 px-2 text-on-overlay"
                    >
                        {{ src }}
                    </div>
                    <AwButton
                        :loading="removeDisabled"
                        size="xs"
                        theme="outline"
                        color="error"
                        class="relative m-1"
                        @click="removeFile(src)"
                    >
                        remove
                    </AwButton>
                    <AwButton
                        :theme="main === src ? 'solid' : 'outline'"
                        :loading="setMainDisabled"
                        size="xs"
                        class="relative m-1"
                        @click="setMain(src)"
                    >
                        main
                    </AwButton>
                </div>
            </div>
            <div
                v-for="({ progress }, id) in filesInProgress"
                :key="id"
                class="relative overflow-hidden shadow"
                style="height: 0; padding-bottom: 56.25%;"
            >
                <div
                    class="absolute inset-0 flex flex-col p-4 items-center justify-center"
                >
                    Loading... {{ progress }}%
                    <AwButton
                        color="default"
                        class="mt-2"
                        size="xs"
                        @click="cancelUpload(id)"
                    >
                        Cancel
                    </AwButton>
                </div>
            </div>
        </AwGrid>
    </AwPage>
</template>

<script>
import { pathOr, isEmpty } from 'rambdax'

export default {
    name: 'MediaGallery',

    data() {
        return {
            title: 'AwUploader',
            headline: this._getTitle('AwUploader'),
            files: [],
            filesInProgress: {},
            main: null,
            removeDisabled: false,
            setMainDisabled: false
        }
    },

    head() {
        return {
            title: this._getMetaTitle(this.title),
            meta: [this._getMetaDescription(this.title)]
        }
    },

    async asyncData({ $axios }) {
        const { data } = await $axios.get('/api/gallery')

        return {
            files: pathOr([], 'data.files', data),
            main: pathOr(null, 'data.main', data)
        }
    },

    methods: {
        removeFile(src) {
            if (!this.files.includes(src)) return

            const tm = setTimeout(() => {
                this.removeDisabled = true
            }, 200)

            this.$axios
                .request({
                    url: '/api/gallery/delete',
                    params: { image: src }
                })
                .then(({ data }) => {
                    this.main = pathOr(null, 'data.main', data)
                    this.files = this.files.filter(_src => _src !== src)
                })
                .finally(() => {
                    clearTimeout(tm)
                    this.removeDisabled = false
                })
        },

        setMain(src) {
            if (src === this.main) return

            const tm = setTimeout(() => {
                this.setMainDisabled = true
            }, 200)

            this.$axios
                .request({
                    url: '/api/gallery/set-main',
                    params: { image: src }
                })
                .then(() => {
                    this.main = src
                })
                .finally(() => {
                    clearTimeout(tm)
                    this.setMainDisabled = false
                })
        },

        setFile({ id, progress, cancel }) {
            this.$set(this.filesInProgress, id, { progress, cancel })
        },

        setLoading({ id, progress }) {
            this.$set(this.filesInProgress[id], 'progress', progress)
        },

        cancelUpload(id) {
            this.filesInProgress[id].cancel()
            this.$delete(this.filesInProgress, id)
        },

        addImage(id, { data }) {
            this.$delete(this.filesInProgress, id)
            this.files.push(data.data.image)
        },

        showError(id, response) {
            this.cancelUpload(id)
            const errors = pathOr([], 'data.errors', response)
            const status = pathOr(null, 'status', response)
            if (status === 422 && !isEmpty(errors)) {
                this.$notify({ type: 'error', title: errors.join(', ') })
            }
        }
    }
}
</script>
