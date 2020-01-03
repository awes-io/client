<template>
    <Transition
        :name="`modal-transition-${theme}`"
        @before-enter="_preOpen"
        @before-appear="_preOpen"
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
            @mousedown.self="selfClose"
        >
            <div :class="elClasses.dialog" role="document">
                <!-- header -->
                <div :class="elClasses.header">
                    <button
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
                    </button>

                    <div :class="elClasses.title">
                        {{ title }}
                    </div>

                    <button
                        :class="elClasses.close"
                        type="button"
                        :title="$t('AwModal.close')"
                        :aria-label="$t('AwModal.close')"
                        @click.prevent="close()"
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
                            <path stroke-width="1.06" d="M16,16 L4,4" />
                            <path stroke-width="1.06" d="M16,4 L4,16" />
                        </svg>
                    </button>
                </div>
                <!-- / header -->

                <!-- content -->
                <div :class="elClasses.body">
                    <div :class="elClasses.content" v-if="stay || showContent">
                        <slot :close-modal="close"></slot>
                    </div>
                </div>
                <!-- / content -->
            </div>
            <!-- / modal__dialog -->
        </aside>
        <!-- / modal -->
    </Transition>
</template>

<script>
import { mergeRouteQuery } from '~/assets/js/router'
import { conf } from '~/assets/js/component'
import { getBemClasses } from '~/assets/js/css'
import { AwModal as _config } from './_config'

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

        param: {
            type: String,
            default: 'modal'
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
            lastFocused: null
        }
    },

    computed: {
        eventBus() {
            return conf(this, 'eventBus', this.$root)
        },

        isOpened() {
            return this.$route.query[this.param] === this.name
        },

        elClasses() {
            return getBemClasses(this.className, [
                'dialog',
                'header',
                'back',
                'title',
                'close',
                'body',
                'content'
            ])
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

        open() {
            this.$router.push(
                mergeRouteQuery(this._getModalParam(this.name), this.$route)
            )
        },

        selfClose() {
            if (this.fullscreen || !this.bgClickClose) return
            let self = this
            window.addEventListener('mouseup', function onUp(e) {
                window.removeEventListener('mouseup', onUp)
                if (e.target === self.$el) {
                    self.close()
                }
            })
        },

        close() {
            this.$router.push(
                mergeRouteQuery(this._getModalParam(null), this.$route)
            )

            // emit closed
            this.eventBus.$emit(`modal::${this.name}:closed`)
            this.$emit('closed')
        },

        _getModalParam(val) {
            let _param = {}
            _param[this.param] = val
            return _param
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
