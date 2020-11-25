<template>
    <Transition
        :name="`modal-transition-${theme}`"
        @before-enter="_preOpen"
        @before-appear="_preOpen"
        @after-enter="$emit('opened')"
        @after-appear="$emit('opened')"
        @after-leave="_afterLeave"
        appear
    >
        <aside
            v-show="isOpened"
            :class="[className, `is-${theme}`]"
            :tabindex="isOpened ? '0' : '-1'"
            role="dialog"
            :aria-hidden="isOpened ? 'false' : 'true'"
            :aria-label="title"
        >
            <div
                ref="container"
                :class="elClasses.container"
                @mousedown.self="selfClose"
            >
                <div :class="elClasses.dialog" role="document">
                    <!-- header -->
                    <div :class="elClasses.header">
                        <div :class="elClasses.title">
                            {{ title }}
                        </div>

                        <AwButton
                            :class="elClasses.close"
                            :title="$t('AwModal.close')"
                            :aria-label="$t('AwModal.close')"
                            @click.prevent="close()"
                            theme="ghost"
                            color="default"
                            content-class="p-2"
                            icon="close"
                            tabindex="0"
                        />
                    </div>
                    <!-- / header -->

                    <div
                        v-if="$scopedSlots.subtitle"
                        :class="elClasses.subtitle"
                    >
                        <slot name="subtitle"></slot>
                    </div>

                    <!-- content -->
                    <div :class="elClasses.body">
                        <div
                            :class="[
                                elClasses.content,
                                $scopedSlots.buttons
                                    ? `${elClasses.content}--buttons`
                                    : ''
                            ]"
                            v-if="stay || showContent"
                        >
                            <slot :close-modal="close"></slot>
                        </div>
                    </div>
                    <!-- / content -->

                    <div
                        v-if="$scopedSlots.buttons"
                        :class="[elClasses.buttons, 'aw-button-group']"
                    >
                        <slot name="buttons"></slot>
                    </div>
                </div>
                <!-- / modal__dialog -->
            </div>
        </aside>
        <!-- / modal -->
    </Transition>
</template>

<script>
import {
    disableBodyScroll,
    enableBodyScroll
} from 'body-scroll-lock/lib/bodyScrollLock.es6.js'
import { mergeRouteQuery } from '../assets/js/router'
import { conf } from '../assets/js/component'
import { getBemClasses } from '../assets/js/css'
import { AwModal as _config } from './_config'
import AwButton from './AwButton.vue'

const DEFAULT_GET_PARAM = 'modal'

const DISABLE_SCROLL_THEMES = ['default', 'fullscreen', 'bottom']

let _uniqModalId = 0

function getStopper() {
    return {
        prevented: false,
        preventClose() {
            this.prevented = true
        }
    }
}

export default {
    name: 'AwModal',

    _config,

    components: {
        AwButton
    },

    props: {
        title: String,

        stay: {
            type: Boolean,
            default() {
                return conf(this, 'stay')
            }
        },

        bgClickClose: {
            type: Boolean,
            default() {
                return conf(this, 'bgClickClose')
            }
        },

        name: {
            type: String,
            default: () => `modal-${_uniqModalId++}`
        },

        /**
         * Get parameter, which is set when modal is opened
         */
        param: {
            type: [String, Boolean],
            /* modal */
            default: DEFAULT_GET_PARAM
        },

        theme: {
            type: String,
            default: 'default'
        },

        /**
         * Should modal disable body scrolling
         */
        disableScroll: {
            type: Boolean,
            // by default disabled for 'default', 'fullscreen' and 'bottom' themes
            default() {
                return DISABLE_SCROLL_THEMES.includes(this.theme)
            }
        },

        className: {
            type: String,
            default() {
                return conf(this, 'baseClass', 'modal')
            }
        }
    },

    data() {
        return {
            showContent: false,
            lastFocused: null,
            localOpened: false
        }
    },

    computed: {
        eventBus() {
            return conf(this, 'eventBus', this.$root)
        },

        isOpened() {
            return this.paramComputed
                ? this.$route.query[this.paramComputed] === this.name
                : this.localOpened
        },

        elClasses() {
            return getBemClasses(this.className, [
                'dialog',
                'header',
                'back',
                'title',
                'subtitle',
                'close',
                'body',
                'content',
                'container',
                'buttons'
            ])
        },

        paramComputed() {
            switch (typeof this.param) {
                case 'string':
                    return this.param || DEFAULT_GET_PARAM
                case 'boolean':
                default:
                    return this.param ? DEFAULT_GET_PARAM : null
            }
        }
    },

    provide() {
        return {
            modal: {
                name: this.name,
                open: this.open,
                close: this.close
            }
        }
    },

    watch: {
        isOpened(isOpened) {
            if (!isOpened) {
                let stopper = getStopper()

                // global event
                this.eventBus.$emit(`modal::${this.name}:before-close`, stopper)
                this.$emit('before-close', stopper)
                if (stopper.prevented) {
                    this.open()
                }
            }
        },

        showContent(isVisible) {
            if (isVisible) {
                if (typeof document === 'undefined') return
                this.lastFocused = document.activeElement
                this.$nextTick(() => this.$el.focus())
                window.addEventListener('keyup', this._escButtonHandler)
            } else {
                window.removeEventListener('keyup', this._escButtonHandler)
                if (this.lastFocused) {
                    this.lastFocused.focus()
                    this.lastFocused = null // clear reference
                }
            }
        }
    },

    methods: {
        _toggleBodyScroll(enable) {
            if (enable) {
                enableBodyScroll(this.$el)
            } else if (this.disableScroll) {
                disableBodyScroll(this.$el, {
                    reserveScrollBarGap: true
                })
            }
        },

        _preOpen() {
            this.showContent = true
            this._toggleBodyScroll(false)
            this.$emit('before-open')
        },

        _afterLeave() {
            this._toggleBodyScroll(true)
            this.showContent = false
            this.$emit('after-close')
        },

        open() {
            if (this.paramComputed) {
                this.$router.push(
                    mergeRouteQuery(
                        { [this.paramComputed]: this.name },
                        this.$route
                    )
                )
            } else {
                this.localOpened = true
            }
        },

        selfClose() {
            if (this.fullscreen || !this.bgClickClose) return
            let self = this
            window.addEventListener('mouseup', function onUp(e) {
                window.removeEventListener('mouseup', onUp)
                if (e.target === self.$refs.container) {
                    self.close()
                }
            })
        },

        close() {
            if (this.paramComputed) {
                this.$router.push(
                    mergeRouteQuery({ [this.paramComputed]: null }, this.$route)
                )
            } else {
                this.localOpened = false
            }

            // emit closed
            this.eventBus.$emit(`modal::${this.name}:closed`)
            this.$emit('closed')
        },

        _escButtonHandler($event) {
            if ($event.keyCode === 27) {
                this.close()
            }
        }
    },

    created() {
        this.showContent = this.isOpened
    },

    mounted() {
        this.eventBus.$on(`modal::${this.name}:open`, this.open)
        this.eventBus.$on(`modal::${this.name}:close`, this.close)
    },

    beforeDestroy() {
        this._afterLeave()
        this.eventBus.$off(`modal::${this.name}:open`, this.open)
        this.eventBus.$off(`modal::${this.name}:close`, this.close)

        // clear external references
        this.lastFocused = null
        window.removeEventListener('keyup', this._escButtonHandler)
    }
}
</script>
