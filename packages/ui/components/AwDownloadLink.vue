<template>
    <span
        v-tooltip:[tooltipPosition]="tooltip"
        class="inline-block whitespace-no-wrap download-link"
        @click="download"
    >
        <!-- The all body of the link. -->
        <slot name="link_body" v-bind="{ loader, download }">
            <AwButton
                v-if="isButton"
                :color="buttonColor"
                :size="buttonSize"
                :disabled="loader"
                content-class="flex items-center"
            >
                <template #default>
                    <span class="sr-only md:not-sr-only">
                        {{ text }}
                    </span>
                </template>

                <template #icon>
                    <AwIcon
                        v-if="loader && isSpinner"
                        name="loader"
                        class="animation-rotate mr-1"
                    />
                    <!-- Slot for Icon -->
                    <slot name="icon">
                        <AwIcon
                            v-if="!loader && isIcon"
                            :name="_icon"
                            width="20"
                            height="20"
                            class="fill-current inline mr-1"
                        />
                    </slot>
                </template>
            </AwButton>

            <span v-if="!isButton">
                <span class="w-5 text-center inline-block text-disabled mr-1">
                    <AwIcon
                        v-if="loader && isSpinner"
                        name="loader"
                        class="animation-rotate"
                    />
                    <!-- Slot for Icon -->
                    <slot name="icon">
                        <AwIcon
                            v-if="!loader && isIcon"
                            :name="_icon"
                            :class="`text-${iconColor}`"
                            width="20"
                            height="20"
                            class="fill-current inline"
                        />
                    </slot>
                </span>
                <AwLink :class="{ disabled: loader }">
                    <!-- The content of the link. -->
                    <slot name="link_text">
                        <!-- The props: `text` -->
                        {{ text }}
                    </slot>
                </AwLink>
            </span>
        </slot>
    </span>
</template>

<script>
const SUPPORTED_FORMATS = {
    pdf: {
        format: 'application/pdf',
        icon: 'fas fa-file-pdf'
    },
    xls: {
        format: 'application/excel',
        icon: 'fas fa-file-excel'
    },
    xlsx: {
        format:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        icon: 'fas fa-file-excel'
    },
    doc: {
        format: 'application/msword',
        icon: 'fas fa-file-word'
    },
    docx: {
        format:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        icon: 'fas fa-file-word'
    },
    jpeg: {
        format: 'image/jpeg',
        icon: 'fas fa-file-image'
    },
    jpg: {
        format: 'image/jpeg',
        icon: 'fas fa-file-image'
    },
    png: {
        format: 'image/png',
        icon: 'fas fa-file-image'
    },
    svg: {
        format: 'image/svg+xml',
        icon: 'fas fa-file-image'
    },
    csv: {
        format: 'text/csv',
        icon: 'fas fa-file-csv'
    }
}

export default {
    name: 'AwDownloadLink',

    props: {
        /**
         * The link to file.
         */
        href: {
            type: String,
            required: true
        },
        /**
         * It is button or link.
         */
        isButton: {
            type: Boolean,
            /* false */
            default: false
        },
        /**
         * Color of the button. Will be ignored if `isButton` is `false`.
         */
        buttonColor: {
            type: String,
            /* warning */
            default: 'warning'
        },
        /**
         * Size of the button. Will be ignored if `isButton` is `false`.
         */
        buttonSize: {
            type: String,
            /* sm */
            default: 'sm'
        },
        /**
         * Text of the button or link.
         */
        text: {
            type: String,
            /* Translatable word "Download" */
            default() {
                return this.$t('AwDownloadLink.download')
            }
        },
        /**
         * Tooltip for the button. To remove tooltip, use `:tooltip="null"`
         */
        tooltip: {
            type: String,
            /* Translatable word "Download" */
            default() {
                return this.$t('AwDownloadLink.download')
            }
        },
        /**
         * The position for tooltip.
         */
        tooltipPosition: {
            type: String,
            /* top */
            default: 'top'
        },
        /**
         * Is it show the spinner when it's loading.
         */
        isSpinner: {
            type: Boolean,
            /* true */
            default: true
        },
        /**
         * Enable or disable icon inside of button or link.
         */
        isIcon: {
            type: Boolean,
            /* true */
            default: true
        },
        /**
         * Color of the icon. Available all colors from collection.
         */
        iconColor: {
            type: String,
            /* grey */
            default: 'disabled'
        },
        /**
         * The name of icon inside of link or button.
         */
        icon: {
            type: String,
            default: null
        },
        /**
         * Type of downloaded file.
         */
        fileType: {
            /* @String Available: `pdf`, `xlsx` */
            type: String,
            /* pdf */
            default: 'pdf',
            validator(value) {
                return Object.keys(SUPPORTED_FORMATS).includes(value)
            }
        }
    },

    data() {
        return { loader: false }
    },

    computed: {
        _icon() {
            return this.icon || SUPPORTED_FORMATS[this.fileType].icon
        }
    },

    methods: {
        async download() {
            this.loader = true
            await this.downloadFile(this.href)
            this.loader = false
        },
        async downloadFile(url) {
            try {
                const resp = await this.$axios.get(url, {
                    responseType: 'arraybuffer',
                    headers: {
                        Accept: SUPPORTED_FORMATS[this.fileType].format
                    }
                })

                // Get Filename
                const disposition = resp.headers['content-disposition']
                const _type = `.${this.fileType}`
                let filename = disposition
                    ? disposition.split('filename=')[1].replace(/"/g, '')
                    : 'file'

                const extension = filename.split('.').pop()
                if (extension !== this.fileType) {
                    filename += _type
                }

                // Get File
                const file = resp.data
                const blob = new Blob([file], {
                    type: SUPPORTED_FORMATS[this.fileType].format
                })
                const blobURL = window.URL.createObjectURL(blob)

                const element = document.createElement('a')
                element.style.display = 'none'
                element.setAttribute('href', blobURL)

                // Set Filename
                element.setAttribute('download', filename)
                document.body.appendChild(element)
                element.click()
                document.body.removeChild(element)
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>

<style lang="postcss">
.download-link i {
    font-style: inherit !important;
}

.disabled {
    @apply cursor-not-allowed;
    text-decoration: none !important;
}
</style>
