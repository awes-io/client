<template>
    <label v-tooltip.show.prepend="errorTooltip" class="aw-uploader">
        <!-- element -->
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

        <!-- Label inside uploader Passes `isDragging<Boolean>` prop, that shows if draggin file above -->
        <slot name="label" :isDragging="isDragging">
            <!-- Icon and text -->
            <svg
                class="text-mono-400 fill-current flex-shrink-0"
                width="40"
                height="28"
                viewBox="0 0 40 28"
            >
                <path
                    d="M19.53 8.53a.75.75 0 00-1.06 0l-6.14 6.15c-.3.29-.3.76 0 1.06l.35.35c.3.3.77.3 1.06 0l4.27-4.26v9.42c0 .41.33.75.75.75h.5c.4 0 .75-.34.75-.75v-9.42l4.26 4.26c.3.3.77.3 1.06 0l.36-.35c.3-.3.3-.77 0-1.06l-6.16-6.15zm16.2 4.4A7 7 0 0026 4.68 10.99 10.99 0 006.01 10.5 9 9 0 009 28h23a8 8 0 003.73-15.07zM32 26H9a7 7 0 01-.94-13.94A9 9 0 0125.33 7.6 4.99 4.99 0 0134 11c0 1.16-.4 2.22-1.06 3.07A6 6 0 0132 26z"
                />
            </svg>
            <span class="block ml-4">
                <span class="sm:text-lg">{{ $t('AwUploader.drop') }}</span>
                <span v-if="formatString" class="block text-sm text-mono-400">
                    {{ $t('AwUploader.format', { formatString }) }}
                </span>
            </span>
        </slot>

        <!-- dropzone -->
        <Transition name="fade">
            <span
                v-show="isDragging"
                ref="dropzone"
                :class="isSingle ? 'fixed' : 'absolute'"
                class="aw-uploader__dragzone"
            >
                <!-- Content inside uploader area. -->
                <slot name="drag-over">
                    <!-- File icon -->
                    <svg
                        width="45"
                        height="60"
                        viewBox="0 0 45 60"
                        class="fill-current"
                    >
                        <path
                            d="M44 12L33 1a3 3 0 00-2-1h-1v15h15v-1l-1-2zm-18 4V0H3a3 3 0 00-3 3v54a3 3 0 003 3h39a3 3 0 003-3V19H29a3 3 0 01-3-3zm9 21v1a2 2 0 01-2 2h-8v8a2 2 0 01-2 2h-1a2 2 0 01-2-2v-8h-8a2 2 0 01-2-2v-1a2 2 0 012-2h8v-8a2 2 0 012-2h1a2 2 0 012 2v8h8a2 2 0 012 2z"
                        />
                    </svg>
                </slot>
            </span>
        </Transition>

        <progress
            v-if="!hideProgress && totalProgress"
            :value="totalProgress"
            max="100"
            class="aw-uploader__progress"
        ></progress>
    </label>
</template>

<script>
import { pathOr, isEmpty, isType, forEach, toLower } from 'rambdax'
import CancelToken from 'axios/lib/cancel/CancelToken'
import isCancel from 'axios/lib/cancel/isCancel'
import { FORM_ENTER_SKIP_ATTR } from '../../assets/js/constants'
import errorMixin from '../../mixins/error'

let __fileId = 1
const __files = {}
const __cancelTokens = {}

const REGISTRY = []

const registry = {
    length: 0
}

let listenerIsSet = false

const onDragEnter = () => {
    for (var i = REGISTRY.length - 1; i >= 0; i--) {
        const vm = REGISTRY[i]
        vm.isDragging = true
    }
}

const onDragLeave = ($event) => {
    if ($event.relatedTarget) return

    for (var i = REGISTRY.length - 1; i >= 0; i--) {
        const vm = REGISTRY[i]
        vm.isDragging = false
    }
}

const onDrop = ($event) => {
    const target = $event.target
    const files = $event.dataTransfer.files

    const vm = REGISTRY.find(
        ({ $el }) => $el === target || $el.contains(target)
    )

    if (vm) {
        $event.preventDefault()
        vm._uploadFile(vm.multiple ? files : [files[0]])
    }

    for (var i = REGISTRY.length - 1; i >= 0; i--) {
        const vm = REGISTRY[i]
        vm.isDragging = false
    }
}

const prevent = ($event) => $event.preventDefault()

const setupDragListenerOnce = () => {
    if (listenerIsSet) return

    document.addEventListener('dragenter', onDragEnter)
    document.addEventListener('dragleave', onDragLeave)
    document.addEventListener('dragover', prevent)
    document.addEventListener('drop', onDrop)

    listenerIsSet = true
}

const removeDragListener = () => {
    document.removeEventListener('dragenter', onDragEnter)
    document.removeEventListener('dragleave', onDragLeave)
    document.removeEventListener('dragover', prevent)
    document.removeEventListener('drop', onDrop)

    listenerIsSet = false
}

export default {
    name: 'AwUploader',

    inheritAttrs: false,

    mixins: [errorMixin],

    props: {
        /**
         * API url, where the files will be sent
         */
        url: {
            type: String,
            required: true
        },

        /**
         * form input[type="file"] field name
         */
        name: {
            type: String,
            default: 'file'
        },

        /**
         * Array of available formats
         */
        format: {
            type: [Array, String],
            default: ''
        },

        /**
         * Max file size in Mb
         */
        max: {
            type: Number,
            default: 2
        },

        /**
         * Allow multiple file upload
         */
        multiple: Boolean,

        /**
         * Hide build-in progress bar
         */
        hideProgress: Boolean
    },

    data() {
        return {
            isDragging: false,
            registry,
            totalProgress: null
        }
    },

    filters: {
        bytesToMb(val) {
            let mb = val / 1024 / 1024
            return (mb < 1 ? mb.toFixed(3) : mb.toFixed(1)) + 'Mb'
        }
    },

    computed: {
        isSingle() {
            return this.registry.length === 1
        },

        _format() {
            const array = Array.isArray(this.format)
                ? this.format
                : isType('String', this.format)
                ? this.format.split(',')
                : []

            return array.reduce((acc, extension) => {
                extension = toLower(extension).replace(/[^\w]/g, '')
                return extension ? acc.concat(extension) : acc
            }, [])
        },

        formatString() {
            return this._format.map((extension) => `*.${extension}`).join(', ')
        },

        maxSizeBytes() {
            return this.max * 1024 * 1024
        },

        mergedAttrs() {
            return { ...this.$attrs, [FORM_ENTER_SKIP_ATTR]: '' }
        }
    },

    mounted() {
        // register instance
        REGISTRY.push(this)
        this.$set(this.registry, 'length', REGISTRY.length)

        // add drag listener
        setupDragListenerOnce()
    },

    beforeDestroy() {
        // cancel all uploads
        forEach(({ id }) => this.cancel(id), __files)

        // remove from registry
        const index = REGISTRY.indexOf(this)
        index !== -1 && REGISTRY.splice(index, 1)

        this.$set(this.registry, 'length', REGISTRY.length)

        // remove drag listener
        if (!REGISTRY.length) {
            removeDragListener()
        }
    },

    methods: {
        _validateFile(file) {
            const errors = []
            const fileName = file.name

            if (this._format.length && !this._extensionMatch(file)) {
                errors.push(this.$t('AwUploader.errorExtension', { fileName }))
            }

            if (this.max && file.size > this.maxSizeBytes) {
                errors.push(this.$t('AwUploader.errorSize', { fileName }))
            }

            return errors
        },

        _uploadFile(files) {
            this.errorText = ''

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

                /**
                 * Fire on upload start, when browser validation is passed
                 * @arg { id: <Number>, file: <String>, loading: <Boolean>, progress: <Number>, cancel: <Function> }
                 */
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
                    .then((response) => {
                        /**
                         * Fire on upload start, when browser validation is passed
                         * @arg id <Number>
                         * @arg response <axios success response>
                         */
                        this.$emit('finish', id, response)
                    })
                    .catch((e) => {
                        if (!isCancel(e)) {
                            const response = pathOr(null, 'response', e)
                            /**
                             * Fire on upload start, when browser validation is passed
                             * @arg id <Number>
                             * @arg response <axios error response>
                             */
                            this.$emit('error', id, response)
                            if (!response) {
                                console.log(e)
                            }
                        }
                    })
                    .finally(() => {
                        this.cancel(id)
                        this.totalProgress = this._getAggregateProgress()
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
            return ($event) => {
                const { total, loaded } = $event
                const progress = Math.round((loaded / total) * 100)
                uploader.progress = progress
                this.totalProgress = this._getAggregateProgress()
                /**
                 * Fire on upload start, when browser validation is passed
                 * @arg { id: <Number>, file: <String>, loading: <Boolean>, progress: <Number>, cancel: <Function> }
                 */
                this.$emit('progress', uploader)
            }
        },

        _getFileExtension(fileName = '') {
            return toLower(fileName)
                .split('.')
                .pop()
        },

        _extensionMatch(file) {
            let extension = this._getFileExtension(file.name)
            return this._format.includes(extension)
        },

        _getAggregateProgress() {
            if (isEmpty(__files)) {
                return null
            } else {
                let acc = 0

                for (let id in __files) {
                    acc += __files[id].progress
                }

                return Math.ceil(acc / Object.keys(__files).length)
            }
        }
    }
}
</script>
