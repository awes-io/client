<template>
    <Transition
        :name="`modal-transition-${theme}`"
        @before-enter="_preOpen"
        @before-appear="_preOpen"
        @before-leave="onBeforeLeave(theme)"
        @after-leave="
            _removeBodyClass(`has-modal-${theme}`)
            showContent = false
        "
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
                        <!-- <button
                            :class="elClasses.back"
                            type="button"
                            :title="$t('AwModal.back')"
                            :aria-label="$t('AwModal.back')"
                            @click.prevent="$router.back()"
                            tabindex="0"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <polyline points="10 14 5 9.5 10 5" />
                                <line x1="16" y1="9.5" x2="5" y2="9.52" />
                            </svg>
                        </button> -->

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
                            content-class="px-2 py-3"
                            icon="close"
                            tabindex="0"
                        />

                        <!-- <button
                            :class="elClasses.close"
                            type="button"
                            :title="$t('AwModal.close')"
                            :aria-label="$t('AwModal.close')"
                            @click.prevent="close()"
                            tabindex="0"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 19 19"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-width="1.06"
                                    d="M1 17L17 1M1 1l16 16"
                                />
                            </svg>
                        </button> -->
                    </div>
                    <!-- / header -->

                    <!-- <div :class="elClasses.title" class="hidden md:block">
                        {{ title }}
                    </div> -->

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
import { mergeRouteQuery } from '../assets/js/router'
import { conf } from '../assets/js/component'
import { getBemClasses } from '../assets/js/css'
import { AwModal as _config } from './_config'

const DEFAULT_GET_PARAM = 'modal'

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
        _addBodyClass(...classes) {
            document.body.classList.add(...classes)
        },

        _removeBodyClass(...classes) {
            document.body.classList.remove(...classes)
        },

        _preOpen() {
            this.showContent = true
            this._addBodyClass(`has-modal-${this.theme}`)
        },

        onBeforeLeave(theme) {
            if (theme === 'fullscreen') {
                this._removeBodyClass(`has-modal-${theme}`)
                this.showContent = false
            }
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
        this.eventBus.$off(`modal::${this.name}:open`, this.open)
        this.eventBus.$off(`modal::${this.name}:close`, this.close)

        // clear external references
        this.lastFocused = null
        window.removeEventListener('keyup', this._escButtonHandler)
    }
}
</script>
