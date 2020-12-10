<template>
    <AwPage v-bind="pageProps">
        <template #heading="{ titleTag, elClasses }">
            <div
                class="aw-user-heading"
                v-on="managable ? { click: handleAvatarClick } : null"
            >
                <!-- breadcrumb -->
                <span class="aw-user-heading__breadcrumb">
                    <NLink
                        v-if="breadcrumb && breadcrumb.href"
                        :to="breadcrumb.href"
                        class="inline-flex items-center p-3 lg:p-0"
                    >
                        <AwIcon name="chevron-l" size="sm" class="mr-1" />
                        <span class="sr-only sm:not-sr-only" tabindex="-1">
                            {{ breadcrumb.title }}
                        </span>
                    </NLink>
                </span>

                <!-- userpic -->
                <AwAvatar
                    ref="avatar"
                    :src="src"
                    :name="name || title"
                    :type="name || title ? 'initials' : 'no-img'"
                    :tag="managable ? 'button' : 'span'"
                    :loading="loading"
                    class="aw-user-heading__userpic"
                />

                <!-- editing dropdown -->
                <AwDropdown
                    v-if="managable"
                    ref="dropdown"
                    :options="{
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, 8]
                                }
                            }
                        ]
                    }"
                >
                    <slot name="avatar-dropdown" />

                    <hr
                        v-if="
                            $scopedSlots['avatar-dropdown'] &&
                                (zoomable || editable)
                        "
                    />

                    <AwDropdownButton
                        v-if="zoomable && src"
                        :text="$t('AwPageUser.zoom')"
                        @click="openZoomModal"
                    />
                    <label
                        v-if="editable"
                        class="aw-dropdown-button aw-dropdown-button_default"
                    >
                        <span tabindex="-1">
                            {{ $t('AwPageUser.upload') }}
                        </span>
                        <input
                            class="sr-only"
                            type="file"
                            accept="image/*"
                            @change="onFileLoaded"
                        />
                    </label>
                    <AwDropdownButton
                        v-if="editable && src"
                        :text="$t('AwPageUser.remove')"
                        color="error"
                        @click="removeAvatar"
                    />
                </AwDropdown>

                <!-- info -->
                <span class="aw-user-heading__info">
                    <Component :is="titleTag" :class="elClasses.title">
                        <slot name="title" :title="title || name">
                            {{ title || name }}
                        </slot>
                    </Component>
                    <slot name="subtitle"></slot>
                </span>
            </div>
        </template>

        <template #buttons="_data">
            <slot name="buttons" v-bind="_data" />
        </template>

        <template #subnav="data">
            <slot name="subnav" v-bind="data"></slot>
        </template>

        <template #default>
            <slot />

            <AwModal
                v-if="src && zoomable"
                ref="zoomModal"
                :title="name || title"
                :param="null"
            >
                <slot name="zoom-image">
                    <img
                        :src="src"
                        :alt="name"
                        width="500"
                        height="500"
                        class="mx-auto"
                    />
                </slot>
            </AwModal>

            <AwModal
                v-if="editable"
                ref="cropModal"
                :param="null"
                :title="$t('AwPageUser.modalTitle')"
                theme="fullscreen"
            >
                <AwCropper :src="uploadedAvatar" @save="saveAvatar" />
            </AwModal>
        </template>
    </AwPage>
</template>

<script>
import { pick, keys, F } from 'rambdax'
import { makePreventableEventMock } from '../assets/js/events'
import AwPage from './AwPage.vue'

export default {
    name: 'AwPageUser',

    components: {
        AwPage
    },

    props: {
        ...AwPage.props,

        src: {
            type: String,
            default: ''
        },

        name: {
            type: String,
            default: ''
        },

        url: {
            type: String,
            default: ''
        },

        zoomable: {
            type: Boolean,
            default: true
        },

        editable: {
            type: Boolean,
            default() {
                return !!this.url
            }
        }
    },

    data() {
        return {
            uploadedAvatar: '',
            loading: false
        }
    },

    computed: {
        managable() {
            return (
                (this.zoomable && this.src) ||
                this.editable ||
                this.$scopedSlots['avatar-dropdown']
            )
        },

        pageProps() {
            const props = pick(keys(AwPage.props), this.$props)

            props.title = props.title || this.name

            return props
        }
    },

    methods: {
        handleAvatarClick($event) {
            const target = $event.target
            const avatar = (this.$refs.avatar && this.$refs.avatar.$el) || {
                contains: F
            }

            if (target && (target === avatar || avatar.contains(target))) {
                $event.stopPropagation()
                this.$refs.dropdown.toggle()
            }
        },

        onFileLoaded($event) {
            this.openCropModal($event.target.files[0])
        },

        openCropModal(file) {
            if (file instanceof File) {
                this.uploadedAvatar = URL.createObjectURL(file)
                this.$refs.cropModal.open()
            }
        },

        closeCropModal() {
            this.$refs.cropModal.close()
        },

        openZoomModal() {
            this.$refs.zoomModal && this.$refs.zoomModal.open()
        },

        closeZoomModal() {
            this.$refs.zoomModal && this.$refs.zoomModal.close()
        },

        saveAvatar(file) {
            const event = makePreventableEventMock()
            event.target = file
            event.currentTarget = this

            this.$emit('save', event)

            if (!event.isDefaultPrevented && this.url) {
                if (file instanceof Blob) {
                    const formData = new FormData()
                    formData.append('file', file, 'avatar.png')
                    this.loading = true

                    this.$axios
                        .request({
                            url: this.url,
                            method: 'post',
                            data: formData
                        })
                        .then(res => {
                            this.$emit('saved', res, file)
                        })
                        .finally(() => {
                            this.loading = false
                        })
                }

                this.closeCropModal()
            }
        },

        removeAvatar() {
            const event = makePreventableEventMock()
            event.currentTarget = this

            this.$emit('remove', event)

            if (!event.isDefaultPrevented && this.url) {
                this.loading = true

                this.$axios
                    .request({ url: this.url, method: 'delete' })
                    .then(res => {
                        this.$emit('removed', res)
                    })
                    .finally(() => {
                        this.loading = false
                    })
            }
        }
    }
}
</script>
