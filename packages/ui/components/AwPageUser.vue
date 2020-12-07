<template>
    <AwPage v-bind="pageProps">
        <template #heading="{ titleTag, elClasses }">
            <div class="aw-user-heading">
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
                    :src="src"
                    :name="name || title"
                    :type="name || title ? 'initials' : 'no-img'"
                    :size="0"
                    class="aw-user-heading__userpic"
                />

                <!-- editing overlay -->
                <span
                    v-if="displayUserpicOverlay"
                    class="aw-user-heading__userpic-overlay"
                >
                    <button
                        v-if="src"
                        class="link text-error"
                        @click="$emit('remove')"
                    >
                        {{ $t('AwPageUser.remove') }}
                    </button>
                    <label v-else class="link cursor-pointer">
                        {{ $t('AwPageUser.upload') }}
                        <input
                            class="sr-only"
                            type="file"
                            accept="image/*"
                            @change="onFileLoaded"
                        />
                    </label>
                </span>

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
                v-if="displayModal"
                ref="modal"
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
import { pick, keys } from 'rambdax'
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
        }
    },

    data() {
        return {
            uploadedAvatar: ''
        }
    },

    computed: {
        displayUserpicOverlay() {
            const listeners = this.$listeners || {}

            return this.src
                ? typeof listeners.remove === 'function'
                : typeof listeners.save === 'function'
        },

        displayModal() {
            return !this.src && typeof this.$listeners.save === 'function'
        },

        pageProps() {
            const props = pick(keys(AwPage.props), this.$props)

            props.title = props.title || this.name

            return props
        }
    },

    methods: {
        onFileLoaded($event) {
            const file = $event.target.files[0]

            if (file instanceof File) {
                this.uploadedAvatar = URL.createObjectURL(file)
                this.$refs.modal.open()
            }
        },

        saveAvatar() {
            this.$emit('save', ...arguments)
            this.$refs.modal.close()
        }
    }
}
</script>
