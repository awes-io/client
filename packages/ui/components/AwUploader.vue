<template>
    <div v-tooltip.show.prepend="errorTooltip" @dragenter="dragOver = true">
        <label
            class="relative p-4 rounded border overflow-y-hidden flex items-center justify-center cursor-pointer group"
            @dragleave="dragOver = false"
            @dragover.prevent
            @drop.prevent="_onDrop"
        >
            <input
                ref="element"
                v-bind="mergedAttrs"
                type="file"
                class="sr-only"
                :name="name || null"
                :accept="format ? formatString : null"
                :multiple="multiple"
                @change="_uploadFile($event.target.files)"
            />

            <span
                class="pointer-events-none opacity-60 group-hover:opacity-90 block text-center"
                :class="{ 'opacity-90': dragOver }"
            >
                <slot name="drag-over" :dragOver="dragOver">
                    <AwIcon name="upload" size="4xl" />
                    <span class="text-lg block mt-2">
                        {{ $t('AwUploader.drop') }}
                    </span>
                </slot>
            </span>
        </label>
    </div>
</template>

<script>
import { pathOr, isEmpty, forEach } from 'rambdax'
import CancelToken from 'axios/lib/cancel/CancelToken'
import isCancel from 'axios/lib/cancel/isCancel'
import { FORM_ENTER_SKIP_ATTR } from '../assets/js/constants'
import errorMixin from '../mixins/error'

let __fileId = 1
const __files = {}
const __cancelTokens = {}

export default {
    name: 'AwUploader',

    inheritAttrs: false,

    mixins: [errorMixin],

    props: {
        url: {
            type: String,
            required: true
        },

        name: {
            type: String,
            default: 'file'
        },

        format: {
            type: Array,
            default: () => []
        },

        max: {
            type: Number,
            default: 2
        },

        multiple: Boolean
    },

    data() {
        return {
            dragOver: false
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
            return this.max * 1024 * 1024
        },

        mergedAttrs() {
            return { ...this.$attrs, [FORM_ENTER_SKIP_ATTR]: '' }
        }
    },

    beforeDestroy() {
        forEach(({ id }) => this.cancel(id), __files)
    },

    methods: {
        _validateFile(file) {
            const errors = []
            const fileName = file.name

            if (this.format.length && !this._extensionMatch(file)) {
                errors.push(this.$t('AwUploader.errorExtension', { fileName }))
            }

            if (this.max && file.size > this.maxSizeBytes) {
                errors.push(this.$t('AwUploader.errorSize', { fileName }))
            }

            return errors
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

                if (!isEmpty(errors)) {
                    const errorText = errors.join('. ')
                    this.errorText = this.errorText
                        ? this.errorText.concat(', ', errorText)
                        : errorText
                    continue
                }

                const [uploader, canceler] = this._createFileRecord(file)
                const id = uploader.id
                const data = new FormData()
                data.append('file', file)

                this.$emit('start', uploader)

                this.$axios
                    .request({
                        method: 'post',
                        url: this.url,
                        data,
                        cancelToken: canceler.token,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: this._setFileProgress(uploader)
                    })
                    .then(response => {
                        this.$emit('finish', id, response)
                    })
                    .catch(e => {
                        if (!isCancel(e)) {
                            const response = pathOr(null, 'response', e)
                            this.$emit('error', id, response)
                            if (!response) {
                                console.log(e)
                            }
                        }
                    })
                    .finally(() => {
                        this.cancel(id)
                    })
            }
        },

        cancel(id) {
            const cancelToken = __cancelTokens[id]

            if (cancelToken) {
                cancelToken.cancel()
            }

            delete __cancelTokens[id]
            delete __files[id]
        },

        _createFileRecord(file) {
            const id = __fileId++

            __cancelTokens[id] = CancelToken.source()

            __files[id] = {
                id,
                file,
                loading: true,
                progress: 0,
                cancel: () => this.cancel(id)
            }

            return [__files[id], __cancelTokens[id]]
        },

        _setFileProgress(uploader) {
            return $event => {
                const { total, loaded } = $event
                const progress = Math.round((loaded / total) * 100)
                uploader.progress = progress
                this.$emit('progress', uploader)
            }
        },

        _getFileExtension(fileName) {
            return fileName.split('.').pop()
        },

        _extensionMatch(file) {
            let extension = this._getFileExtension(file.name)
            return this.format.includes(extension)
        }
    }
}
</script>
