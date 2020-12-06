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

<style lang="postcss">
.aw-user-heading {
    display: grid;
    grid-template-columns: 1fr 160px 1fr;
    grid-template-rows: 160px auto;

    width: 100%;
    padding: theme('spacing.4') 0;

    &__breadcrumb {
        @apply text-disabled;
        padding-right: theme('spacing.4');

        a:hover,
        a:focus {
            outline: none;

            span {
                text-decoration: underline;
                outline: none;
            }
        }
    }

    &__userpic,
    &__userpic-overlay {
        text-align: center;
        grid-column: 2;
        grid-row: 1;
        width: 160px;
        height: 160px;
        border-radius: 80px;
    }

    &__userpic {
        @apply text-7xl;
    }

    &__userpic-overlay {
        @apply bg-surface;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        opacity: 0;
        transition: 120ms opacity;
        z-index: 2;

        &:hover,
        &:focus-within {
            opacity: 0.8;
        }
    }

    &__info {
        grid-column: 1 / 4;
        grid-row: 2;

        display: flex;
        flex-direction: column;
        align-items: center;

        padding-top: theme('spacing.4');
    }
}

@screen lg {
    .aw-user-heading {
        grid-template-columns: 92px auto;
        grid-template-rows: auto auto;

        &__breadcrumb {
            grid-column: 2;
            grid-row: 1;

            align-self: end;

            padding-left: theme('spacing.4');
        }

        &__userpic,
        &__userpic-overlay {
            width: 92px;
            height: 92px;
            border-radius: 46px;
            grid-column: 1;
            grid-row: 1 / 3;
        }

        &__userpic {
            @apply text-4xl;
        }

        &__info {
            grid-column: 2;
            grid-row: 2;
            align-items: start;

            padding-top: 0;
            padding-left: theme('spacing.4');
        }
    }
}
</style>
