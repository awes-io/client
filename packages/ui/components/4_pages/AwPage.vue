<template>
    <div class="aw-page">
        <div
            class="aw-page__heading"
            :class="{
                'aw-page__heading--muted': layout === 'default'
            }"
        >
            <slot
                name="heading"
                v-bind="{ titleTag, title, breadcrumb, elClasses }"
            >
                <AwPageHeadline
                    class="container-fluid"
                    :title="_title"
                    :breadcrumb="breadcrumb"
                >
                    <template
                        v-for="(index, name) in $scopedSlots"
                        v-slot:[name]="data"
                    >
                        <slot :name="name" v-bind="data"></slot>
                    </template>
                </AwPageHeadline>
            </slot>

            <!-- subnav -->
            <div>
                <slot name="subnav" :subnav="subnav">
                    <div v-if="subnav.length" class="container">
                        <div class="-mb-px -mx-4">
                            <AwTabNav
                                :items="subnav"
                                class="border-transparent"
                            />
                        </div>
                    </div>
                </slot>
            </div>
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
        >
            <div class="container">
                <slot />
            </div>
            <div
                v-if="isFullscreen || isFakeFullscreen"
                class="container flex align-bottom"
            >
                <div
                    class="flex-1 text-sm text-mono-400"
                    v-html="$t('AwLayoutDefault.footer')"
                ></div>
                <div class="flex-1 text-center">
                    <AwButton
                        color="surface"
                        class="-mb-4"
                        content-class="rounded-b-none normal-case"
                        @click="toggleFullscreen(false)"
                    >
                        <AwIconSystem name="close" class="mr-4" />
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

        <!-- bottom bar -->
        <slot v-if="!hideBottomBar" name="bottom-bar">
            <AwBottomBar class="aw-page__aw-bottom-bar" :items="bottomMenu">
                <template
                    v-for="(index, name) in $scopedSlots"
                    v-slot:[name]="data"
                >
                    <slot :name="name" v-bind="data"></slot>
                </template>
            </AwBottomBar>
        </slot>
    </div>
</template>

<script>
import { pathOr } from 'rambdax'
import { getBemClasses } from '@AwUtils/css'
import AwBottomBar from '@AwOrganisms/AwBottomBar.vue'
import AwPageHeadline from '@AwPages/_AwPageHeadline.vue'

export default {
    name: 'AwPage',

    components: {
        AwBottomBar,
        AwPageHeadline
    },

    props: {
        // Main headline on the page
        title: {
            type: String,
            default: ''
        },

        titleTag: {
            type: String,
            default: null
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
        fullscreen: Boolean,

        // Disable mobile bottom menu
        hideBottomBar: Boolean
    },

    inject: {
        layout: {
            default: ''
        }
    },

    head() {
        let title = this.title

        if (this._breadcrumb) {
            title = this._breadcrumb.text + ' / ' + title
        }

        return {
            title
        }
    },

    data() {
        return {
            isFullscreen: false,
            isFakeFullscreen: false
        }
    },

    computed: {
        bottomMenu() {
            return []
        },

        _title() {
            return this.title
            // this.$t(pathOr('', 'current.text', this.currentPage))
        },

        elClasses() {
            return getBemClasses('aw-page', [
                'title',
                'title_min-height',
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
