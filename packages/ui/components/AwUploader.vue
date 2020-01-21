<template>
    <div @dragenter="dragOver = true">
        <label
            class="relative p-4 rounded-sm border overflow-y-hidden flex items-center justify-center cursor-pointer group"
            @dragleave="dragOver = false"
            @dragover.prevent
            @drop.prevent="_onDrop"
        >
            <input
                v-bind="$attrs"
                type="file"
                class="sr-only"
                :accept="format ? formatString : null"
                :multiple="multiple"
                @change="_uploadFile($event.target.files)"
            />

            <span
                class="text-lg pointer-events-none opacity-60 group-hover:opacity-90 block text-center"
                :class="{ 'opacity-90': dragOver }"
            >
                <slot name="drag-over" :dragOver="dragOver">
                    <AwIcon name="upload" size="4xl" />
                    <span class="block mt-2">
                        {{ $t('AwUploader.drop') }}
                    </span>
                </slot>
            </span>
        </label>

        <!-- file list -->
        <slot name="file-list" v-bind="{ files: filesStats, removeFile }">
            <AwUploaderFiles :files="filesStats" :remove-file="removeFile" />
        </slot>

        <!-- file fields -->
        <template v-if="name">
            <template v-for="{ uploadedId } in files">
                <input
                    v-if="uploadedId"
                    :key="uploadedId"
                    type="hidden"
                    tabindex="-1"
                    :name="name"
                    :value="uploadedId"
                />
            </template>
        </template>
    </div>
</template>

<script>
import { path, values } from 'rambdax'
import CancelToken from 'axios/lib/cancel/CancelToken'
import isCancel from 'axios/lib/cancel/isCancel'

let _fileId = 0

export default {
    name: 'AwUploader',

    inheritAttrs: false,

    props: {
        url: {
            type: String,
            required: true
        },

        name: {
            type: String,
            default: ''
        },

        format: {
            type: Array,
            default: () => []
        },

        max: {
            type: Number,
            default: 2
        },

        getFileId: {
            type: Function,
            default: path('data.fileId')
        },

        multiple: Boolean
    },

    data() {
        return {
            dragOver: false,
            files: {},
            cancelFiles: {}
        }
    },

    filters: {
        bytesToMb(val) {
            let mb = val / 1024 / 1024
            return (mb < 1 ? mb.toFixed(3) : mb.toFixed(1)) + 'Mb'
        }
    },

    computed: {
        formatString() {
            return this.format.map(extension => `*.${extension}`).join(', ')
        },

        maxSizeBytes() {
            return this.size * 1024 * 1024
        },

        filesStats() {
            return values(this.files)
        }
    },

    methods: {
        _validateFile(file) {
            const errors = []
            const fileName = file.name

            if (this.format.length && !this._extensionMatch(file)) {
                errors.push(this.$t('AwUploader.errorExtension', { fileName }))
            }

            if (this.size && file.size > this.maxSizeBytes) {
                errors.push(this.$t('AwUploader.errorSize', { fileName }))
            }

            return errors
        },

        _createFileRecord(name) {
            const id = _fileId++

            this.$set(this.files, id, {
                id,
                name,
                progress: 0,
                loaded: false
            })

            return id
        },

        _onDrop($event) {
            this.dragOver = false
            const files = $event.dataTransfer.files
            this._uploadFile(this.multiple ? files : [files[0]])
        },

        _uploadFile(files) {
            for (var i = files.length - 1; i >= 0; i--) {
                const file = files[i]
                const errors = this._validateFile(file)

                if (errors.length) {
                    this.$emit('error', errors)
                    return
                }

                const id = this._createFileRecord(file.name)
                const data = new FormData()

                data.append('file', file)

                this.cancelFiles[id] = CancelToken.source()

                this.$axios
                    .request({
                        method: 'post',
                        url: this.url,
                        data,
                        cancelToken: this.cancelFiles[id].token,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: this._setFileProgress(id)
                    })
                    .then(data => {
                        delete this.cancelFiles[id]
                        const fileId = this.getFileId(data)
                        this.$set(this.files[id], 'uploadedId', fileId)
                        this.$set(this.files[id], 'loaded', true)
                    })
                    .catch(e => {
                        if (!isCancel(e)) {
                            console.log(e)
                        }
                    })
            }
        },

        removeFile(id) {
            const fileLoader = this.cancelFiles[id]

            if (fileLoader) {
                fileLoader.cancel()
                delete this.cancelFiles[id]
            }

            this.$delete(this.files, id)
        },

        _setFileProgress(id) {
            return $event => {
                const { total, loaded } = $event
                const progress = Math.round((loaded / total) * 100)
                this.$set(this.files[id], 'progress', progress)
            }
        },

        _getFileExtension(fileName) {
            return fileName.split('.').pop()
        },

        // _getFileName(fileName) {
        //     let name = fileName.split('.')
        //     name.pop()
        //     return name.join('.')
        // },

        _extensionMatch(file) {
            let extension = this._getFileExtension(file.name)
            return this.format.includes(extension)
        }
    }
}
</script>
