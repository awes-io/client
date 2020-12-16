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
            >
                <template #default>
                    <span class="whitespace-no-wrap inline-block">
                        {{ text }}
                    </span>
                </template>

                <template #icon>
                    <span
                        v-if="loader && isSpinner"
                        class="inline-flex justify-start w-5 mr-1"
                    >
                        <AwIcon name="loader" class="animation-rotate" />
                    </span>

                    <!-- Slot for Icon -->
                    <template v-if="!loader && isIcon">
                        <slot name="icon">
                            <AwIcon
                                :name="_icon"
                                class="fill-current inline w-5 text-left mr-1"
                            />
                        </slot>
                    </template>
                </template>
            </AwButton>

            <span v-if="!isButton">
                <span class="w-5 text-center inline-block text-disabled">
                    <span
                        v-if="loader && isSpinner"
                        class="inline-flex items-center justify-start w-5 mr-1"
                    >
                        <AwIcon name="loader" class="animation-rotate" />
                    </span>

                    <!-- Slot for Icon -->
                    <template v-if="!loader && isIcon">
                        <slot name="icon">
                            <AwIcon
                                :name="_icon"
                                :class="`text-${iconColor}`"
                                class="fill-current inline w-5 mr-1"
                            />
                        </slot>
                    </template>
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
        icon: 'file-pdf'
    },
    xls: {
        format: 'application/excel',
        icon: 'file-excel'
    },
    xlsx: {
        format:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        icon: 'file-excel'
    },
    doc: {
        format: 'application/msword',
        icon: 'file-word'
    },
    docx: {
        format:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        icon: 'file-word'
    },
    jpeg: {
        format: 'image/jpeg',
        icon: 'fas fa-file-image'
    },
    jpg: {
        format: 'image/jpeg',
        icon: 'file-image'
    },
    png: {
        format: 'image/png',
        icon: 'file-image'
    },
    svg: {
        format: 'image/svg+xml',
        icon: 'file-image'
    },
    csv: {
        format: 'text/csv',
        icon: 'file-csv'
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
            /* md */
            default: 'md'
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
    @apply text-left;
    font-style: inherit !important;
}

.disabled {
    @apply cursor-wait;
    text-decoration: none !important;
}
</style>
