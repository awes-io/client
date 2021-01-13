<template>
    <AwInput
        ref="input"
        size="sm"
        v-bind="$attrs"
        v-model="text"
        autocomplete="off"
        :placeholder="placeholder"
        @keydown.enter.prevent="_setSearchImmediate"
    >
        <template #icon>
            <AwIconSystem
                v-if="!$route.query[param]"
                name="search"
                class="h-full w-10 p-3"
            />
            <button v-else class="focus:outline-none" @click="_clear">
                <AwIconSystem name="close" class="h-full w-10 p-3" />
            </button>
        </template>
    </AwInput>
</template>

<script>
import { mergeRouteQuery } from '@AwUtils/router'

const INPUT_ELEMENTS = ['input', 'textarea']

export default {
    name: 'AwSearch',

    data() {
        return {
            text: ''
        }
    },

    props: {
        /**
         * Which GET-param should component set to query string
         */
        param: {
            type: String,
            default: 'search'
        },

        /**
         * Debounce before query string update on user input
         * @type {Object}
         */
        debounce: {
            type: Number,
            default: 400
        },

        /**
         * If set, the component will listen on user input,
         * and if the active element is not `input` or `textarea`,
         * and `event.key` matches, the component will get focus.
         * Pass `false` or empty string to disable
         */
        globalKeyBind: {
            type: [String, Boolean],
            default: '/',
            validator(key) {
                return typeof key === 'string' ? key.length < 2 : true
            }
        }
    },

    computed: {
        placeholder() {
            const basicPlaceholder = this.$t('AwSearch.text')

            return this.globalKeyBind
                ? basicPlaceholder +
                      this.$t('AwSearch.keyBind', { key: this.globalKeyBind })
                : basicPlaceholder
        }
    },

    watch: {
        text: function(newValue) {
            const currentValue = this.$route.query[this.param] || ''

            if (newValue === currentValue) return

            clearTimeout(this._tm)

            this._tm = setTimeout(this._setSearchParam, this.debounce, newValue)
        },

        '$route.query': {
            immediate: true,
            handler(query) {
                clearTimeout(this._tm)
                this.text = query[this.param] || ''
            }
        },

        globalKeyBind: {
            immediate: true,
            handler(key, prevKey) {
                if (!this.$isServer && key) {
                    this._toggleKeyBind(true)
                } else if (prevKey) {
                    this._toggleKeyBind(false)
                }
            }
        }
    },

    beforeDestroy() {
        clearTimeout(this._tm)
    },

    methods: {
        _setSearchParam(text) {
            this.$router
                .replace(mergeRouteQuery({ [this.param]: text }, this.$route))
                .catch((e) => {
                    console.log(e)
                })
        },

        _setSearchImmediate($event) {
            clearTimeout(this._tm)
            this._setSearchParam($event.target.value)
        },

        _clear() {
            this._setSearchParam('')
            this.$refs.input.focus()
        },

        _toggleKeyBind(on = false) {
            if (on && this.globalKeyBind) {
                document.addEventListener('keydown', this._globalKeyListener)

                this.$once('hook:beforeDestroy', this._toggleKeyBind)
            } else {
                document.removeEventListener('keydown', this._globalKeyListener)
            }
        },

        _globalKeyListener($event = {}) {
            if ($event.key !== this.globalKeyBind) return

            const activeElement = document.activeElement

            if (
                activeElement &&
                INPUT_ELEMENTS.indexOf(activeElement.tagName.toLowerCase()) !==
                    -1
            ) {
                return
            }

            $event.preventDefault()
            $event.stopPropagation()

            this.$refs.input.focus()
        }
    }
}
</script>
