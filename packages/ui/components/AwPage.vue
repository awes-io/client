<template>
    <div :class="className">
        <div class="flex items-end container">
            <div class="flex-auto">
                <!-- title -->
                <Component
                    :is="titleTag"
                    :class="[elClasses.title]"
                    :key="title.key || title"
                >
                    <!-- Breadcrumb link back to catalog -->
                    <slot name="breadcrumb">
                        <!-- if prop breadctumb is empty, block is empty too -->
                        <div
                            v-if="
                                breadcrumb &&
                                    breadcrumb.href &&
                                    breadcrumb.title
                            "
                            class="flex items-center"
                        >
                            <AwButton
                                :href="breadcrumb.href"
                                :title="breadcrumb.title"
                                class="mr-4"
                                content-class="p-2"
                                size="sm"
                                icon="chevron-l"
                                color="default"
                            />
                            <span class="hidden sm:inline-block">
                                <AwLink :href="breadcrumb.href" class="mr-2">{{
                                    breadcrumb.title
                                }}</AwLink>
                                <span
                                    class="text-sm text-disabled align-middle mr-4"
                                    >&#47;</span
                                >
                            </span>
                        </div>
                    </slot>
                    <!-- Title of the page -->
                    <slot name="title" :title="title">
                        <!-- Empty string -->
                        {{ title }}
                    </slot>
                </Component>
            </div>
            <div v-if="!!$slots.buttons" class="py-4 flex-none pl-4">
                <slot
                    name="buttons"
                    v-bind="{ isFullscreen, toggleFullscreen }"
                ></slot>
            </div>
        </div>

        <!-- subnav -->
        <div>
            <slot name="subnav">
                <div v-if="subnav.length" class="border-b bg-muted">
                    <div class="container">
                        <div class="-mb-px -mx-4">
                            <AwTabNav
                                :items="subnav"
                                class="border-transparent"
                            />
                        </div>
                    </div>
                </div>
            </slot>
        </div>

        <!-- content -->
        <div
            ref="content"
            :class="[
                elClasses.content,
                {
                    [elClasses.contentFullscreen]:
                        isFullscreen || isFakeFullscreen
                },
                { [elClasses.contentFakeFullscreen]: isFakeFullscreen }
            ]"
            class="content"
        >
            <div class="container">
                <slot />
            </div>
            <div
                v-if="isFullscreen || isFakeFullscreen"
                class="container flex align-bottom"
            >
                <div
                    class="flex-1 text-sm text-disabled"
                    v-html="$t('AwLayoutDefault.footer')"
                ></div>
                <div class="flex-1 text-center">
                    <AwButton
                        color="surface"
                        class="-mb-4"
                        content-class="rounded-b-none normal-case"
                        @click="toggleFullscreen(false)"
                    >
                        <AwIcon name="close" class="mr-4" />
                        {{ $t('AwPage.exitFullscreen') }}
                    </AwButton>
                </div>
                <div class="flex-1 flex">
                    <AwSwitcher
                        v-if="hasDarkThemeSwitcher"
                        :checked="isDarkTheme"
                        :label="$t('AwUserMenu.darkTheme')"
                        class="ml-auto"
                        @change="isDarkTheme = $event"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { pathOr } from 'rambdax'
import { AwPage as _config } from './_config'
import { conf } from '../assets/js/component'
import { getBemClasses } from '../assets/js/css'

export default {
    name: 'AwPage',

    _config,

    props: {
        // Main headline on the page
        title: {
            type: String,
            default: ''
        },

        titleTag: {
            type: String,
            default() {
                return conf(this, 'titleTag')
            }
        },

        className: {
            type: String,
            default() {
                return conf(this, 'baseClass')
            }
        },

        // Subnavigation for the page
        subnav: {
            type: Array,
            default: () => []
        },

        // Breadcrumb object with title and href to return back
        breadcrumb: {
            type: Object,
            default: () => {},
            validator(params) {
                if (
                    typeof params.title !== 'undefined' &&
                    typeof params.href !== 'undefined'
                ) {
                    return true
                }
                return false
            }
        },

        // A prop to toggle page fullscreen mode
        fullscreen: Boolean
    },

    head() {
        return {
            title: this.getTitle
        }
    },

    data() {
        return {
            isFullscreen: false,
            isFakeFullscreen: false
        }
    },

    computed: {
        getTitle() {
            let title = this.title
            if (this.breadcrumb) {
                title += ' / ' + this.breadcrumb.title
            }
            return title
        },

        elClasses() {
            return getBemClasses(this.className, [
                'title',
                'subnav',
                'tabs',
                'content',
                'content_fullscreen',
                'content_fake-fullscreen'
            ])
        },

        hasDarkThemeSwitcher() {
            return !!pathOr(false, '$store.state.awesIo', this)
        },

        isDarkTheme: {
            get() {
                return this.$store.state.awesIo.isDarkTheme
            },

            set(val) {
                this.$store.commit('awesIo/SET_DARK_THEME', val)
            }
        }
    },

    watch: {
        fullscreen: 'toggleFullscreen',

        isFakeFullscreen(value) {
            if (this.fullscreen !== value) {
                this.$emit('update:fullscreen', value)
            }
        }
    },

    beforeDestory() {
        this.$emit('update:fullscreen', false)
        this.watchFullscreenState(false)
    },

    methods: {
        toggleFullscreen(enable = !this.isFullscreen) {
            try {
                if (enable !== false && !document.fullscreenElement) {
                    this.$refs.content.requestFullscreen()
                    this.watchFullscreenState(true)
                }

                if (enable === false && document.fullscreenElement) {
                    document.exitFullscreen()
                }
            } catch (e) {
                this.isFakeFullscreen = !!enable
            }
        },

        watchFullscreenState(enable) {
            document[enable ? 'addEventListener' : 'removeEventListener'](
                'fullscreenchange',
                this.onFullscreenChange
            )
        },

        onFullscreenChange() {
            this.isFullscreen =
                document.fullscreenElement === this.$refs.content

            if (this.fullscreen !== this.isFullscreen) {
                this.$emit('update:fullscreen', this.isFullscreen)
            }

            if (!this.isFullscreen) {
                this.watchFullscreenState(false)
            }
        }
    }
}
</script>
