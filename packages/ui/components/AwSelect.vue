<template>
    <div
        :class="{ 'aw-select--invert': invert }"
        class="relative aw-select"
        @keydown.up="_arrowFocusItem(-1, $event)"
        @keydown.down="_arrowFocusItem(+1, $event)"
        @click="_selectOnClick"
    >
        <!-- value -->
        <!-- <select
            v-if="name"
            :name="name"
            :multiple="multiple"
            tabindex="-1"
            class="hidden"
            @invalid.prevent="
                $refs.input.setError($event.target.validationMessage)
            "
        >
            <option
                v-for="index in selectedIndexes"
                :key="index"
                :value="JSON.stringify(_getValue(selectOptions[index]))"
                selected
            >
                {{ _getLabel(selectOptions[index]) }}
            </option>
        </select> -->

        <!-- show label -->
        <AwInput
            ref="input"
            :value="_inputValue"
            :label="label"
            :class="{
                'is-filled': searchable && isOpened,
                'not-searchable': !searchable,
                opened: isOpened
            }"
            :placeholder="_selectedLabel"
            :readonly="!searchable"
            v-bind="$attrs"
            autocomplete="off"
            data-arrow-focus
            @mousedown.native="_onMouseDown"
            @focus="_onFocus"
            @blur="_onBlur"
            @input="_applySearch"
            @keydown.enter="_selectOnEnter"
        >
            <template #element>
                <slot name="element" v-bind="{ value: _inputValue }"></slot>
            </template>

            <template v-if="$scopedSlots.prefix" #prefix>
                <slot name="prefix" />
            </template>

            <template v-if="$scopedSlots.postfix" #postfix>
                <slot name="postfix" />
            </template>

            <template #icon>
                <AwButton
                    v-if="clearable"
                    v-show="!isOpened && selectedIndexes.length"
                    @click="selectedIndexes = []"
                    icon="close"
                    theme="icon"
                />
                <AwButton
                    :size="$attrs.size || 'md'"
                    tabindex="-1"
                    theme="icon"
                    class="h-full"
                    @click="searchable ? toggleDropdown() : null"
                >
                    <AwIcon
                        v-if="isLoading"
                        key="loader"
                        name="loader"
                        size="xl"
                        class="text-brand animation-rotate"
                    />
                    <AwIcon
                        v-if="!isLoading && optionsList.length"
                        key="arrow"
                        name="triangle-d"
                        size="xl"
                        class="transition-200"
                        :class="{ 'rotate-180': isOpened }"
                    />
                </AwButton>
            </template>
        </AwInput>

        <!-- options -->
        <AwDropdown
            ref="dropdown"
            class="w-full"
            :show.sync="isOpened"
            :close-on-action="!multiple"
            :close-outside="false"
        >
            <slot name="dropdown" v-bind="{ optionsList, isOpened }">
                <!-- not equal -->
                <AwDropdownButton
                    v-if="_showNotEqual"
                    @click="_onClickNotEqual"
                    tabindex="-1"
                    data-arrow-focus
                >
                    <slot name="not-equal" :searchPhrase="searchPhrase" />
                </AwDropdownButton>

                <hr v-if="_showNotEqual" style="margin: 0" />

                <!-- options list -->
                <template v-if="optionsList.length">
                    <AwDropdownButton
                        v-for="({ optionLabel, index, active },
                        i) in optionsList"
                        :key="`${optionLabel}-${index}`"
                        :active="active"
                        :data-select-index="index"
                        tabindex="-1"
                        data-arrow-focus
                    >
                        <slot
                            name="option-label"
                            v-bind="{ ...optionsList[i], searchPhrase }"
                        >
                            <div class="flex items-center">
                                <AwCheckbox
                                    v-if="multiple"
                                    :checked="active"
                                    tabindex="-1"
                                    class="mr-3"
                                    @click.stop="_selectIndex(index)"
                                />
                                <span v-html="_highlightOption(optionLabel)" />
                            </div>
                        </slot>
                    </AwDropdownButton>
                </template>

                <!-- not found -->
                <AwDropdownButton
                    v-else-if="!isLoading && searchPhrase"
                    @click="_selectOnEnter"
                    tabindex="-1"
                    data-arrow-focus
                >
                    <slot name="not-found" :searchPhrase="searchPhrase">
                        {{ $t('AwSelect.notFound') }}
                    </slot>
                </AwDropdownButton>
            </slot>
        </AwDropdown>
    </div>
</template>

<script>
import { path, pathOr, isNil } from 'rambdax'
import CancelToken from 'axios/lib/cancel/CancelToken'
import isCancel from 'axios/lib/cancel/isCancel'
import arrowFocusMixin from '../mixins/arrow-focus'
import AwIcon from './AwIcon.vue'
import AwInput from './AwInput.vue'
import AwButton from './AwButton.vue'
import AwDropdown from './AwDropdown.vue'
import AwDropdownButton from './AwDropdownButton.vue'

export default {
    inheritAttrs: false,

    name: 'AwSelect',

    components: {
        AwIcon,
        AwInput,
        AwButton,
        AwDropdown,
        AwDropdownButton
    },

    mixins: [arrowFocusMixin],

    props: {
        options: {
            type: [Array, Function], // function means isAjax
            default: () => []
        },

        label: {
            type: String,
            default: ''
        },

        value: {
            default: null
        },

        optionLabel: {
            type: String,
            default: ''
        },

        trackBy: {
            type: String,
            default: ''
        },

        searchable: {
            type: Boolean,
            default: true
        },

        /**
         * Show clear button if value exists
         */
        clearable: Boolean,

        maxSearchItems: {
            type: Number,
            default: 100
        },

        // name: {
        //     type: String,
        //     default: ''
        // },

        /**
         * Allow select multiple values
         */
        multiple: Boolean,

        /**
         * Separator for multiple values
         */
        multipleSeparator: {
            type: String,
            default: ', '
        },

        // ajax
        searchPreload: {
            type: [Array, Object, Boolean],
            default: true
        },

        searchMin: {
            type: Number,
            default: 0
        },

        debounce: {
            type: Number,
            default: 400
        },

        invert: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            isOpened: false,
            isSearching: false,
            searchPhrase: '',
            selectOptions: [],

            // ajax
            cancellation: null,
            isLoading: false
        }
    },

    computed: {
        selectedIndexes: {
            get() {
                if (isNil(this.value)) {
                    return []
                }

                const value = Array.isArray(this.value)
                    ? this.value
                    : [this.value]

                return value.reduce((acc, option) => {
                    const index = this.selectOptions.findIndex(_option => {
                        return this._getValue(_option) === option
                    })
                    return index === -1 ? acc : acc.concat(index)
                }, [])
            },

            set(indexes) {
                if (!Array.isArray(indexes)) return

                const options = indexes.reduce((acc, index) => {
                    const option = this.selectOptions[index]
                    return isNil(option) ? acc : acc.concat(option)
                }, [])
                const values = options.map(this._getValue)

                if (this.multiple) {
                    this.$emit('input', values, options)
                } else {
                    this.$emit('input', values[0], options[0])
                    this._close()
                }
            }
        },

        optionsList() {
            return this.selectOptions.reduce((acc, option, index) => {
                const active = this.selectedIndexes.includes(index)
                const inRange = acc.length < this.maxSearchItems
                const matchSerach = this._hasInternalSearch
                    ? this._matchSearch(option)
                    : true

                return inRange && matchSerach
                    ? acc.concat({
                          option,
                          optionLabel: this._getLabel(option),
                          index,
                          active
                      })
                    : acc
            }, [])
        },

        _selectedLabel() {
            return this.selectedIndexes
                .map(index => this._getLabel(this.selectOptions[index]))
                .join(this.multipleSeparator)
        },

        _inputValue() {
            if (this.isSearching) {
                return this.searchPhrase
            }
            return this._selectedLabel
        },

        _optionSearchRegEx() {
            return this._hasInternalSearch && new RegExp(this.searchPhrase, 'i')
        },

        _isAjax() {
            return typeof this.options === 'function'
        },

        _hasInternalSearch() {
            return !this._isAjax && this.searchable && !this.$listeners.search
        },

        _showNotEqual() {
            return !!(
                this.searchPhrase &&
                this.selectOptions.length &&
                (this.$slots['not-equal'] || this.$scopedSlots['not-equal']) &&
                !this.selectOptions.find(
                    option =>
                        this._getLabel(option).toLowerCase() ===
                        this.searchPhrase.toLowerCase()
                )
            )
        },

        chevronSize() {
            return this.$attrs.size || 'xl'
        }
    },

    watch: {
        value() {
            this.$refs.input.setError()
        },

        isOpened(opened) {
            if (opened) {
                this.searchPhrase = ''
                this.isSearching = !!this.searchable
                this._toggleOutsideHandler(true)
                if (
                    !this.selectedIndexes.length &&
                    this._isAjax &&
                    !!this.searchPreload
                ) {
                    this._preloadOptions()
                }
            } else {
                this.isSearching = false
                this._toggleOutsideHandler(false)
                this.cancelRequest()
            }
        }
    },

    created() {
        if (!this._isAjax) {
            const unwatch = this.$watch('options', {
                handler(options) {
                    this.selectOptions = options
                },
                immediate: true
            })

            this.$once('hook:beforeDestroy', unwatch)
        }

        if (this.searchable) {
            const unwatch = this.$watch('searchPhrase', () => {
                this.$nextTick(() => {
                    this.$refs.dropdown.update()
                })
            })

            this.$once('hook:beforeDestroy', unwatch)
        }
    },

    mounted() {
        if (this._isAjax && !!this.searchPreload) {
            this._preloadOptions()
        }
    },

    beforeDestroy() {
        clearTimeout(this._tm)
        this._toggleOutsideHandler(false)
    },

    methods: {
        _getLabel(option) {
            return this.optionLabel ? path(this.optionLabel, option) : option
        },

        _getValue(option) {
            return this.trackBy ? path(this.trackBy, option) : option
        },

        _matchSearch(option) {
            return this._optionSearchRegEx.test(this._getLabel(option))
        },

        _applySearch(text) {
            this.searchPhrase = text
            this.$refs.dropdown.update()

            if (this.$listeners.search) {
                this.$emit('search', text)
            }

            if (!this._isAjax) {
                return
            }

            clearTimeout(this._tm)

            if (text.length > this.searchMin) {
                this._tm = setTimeout(this.fetch, this.debounce)
            } else {
                this.cancelRequest()
                !text.length && this._preloadOptions()
            }
        },

        _highlightOption(option) {
            if (!this.searchPhrase.trim().length) {
                return option
            }

            const matches = option.match(new RegExp(this.searchPhrase, 'gi'))
            return this._addBoldTagsToString(option, matches)
        },

        _addBoldTagsToString(str, matches = []) {
            if (!matches) return str

            const used = {}
            let fin = str
            matches.forEach(match => {
                if (!used[match]) {
                    fin = fin.replace(new RegExp(match, 'g'), `<b>${match}</b>`)
                    used[match] = true
                }
            })
            return fin
        },

        toggleDropdown() {
            if (this.isOpened) {
                this.isOpened = false
            } else {
                this.$refs.input.focus()
            }
        },

        _onMouseDown(e) {
            if (!this.searchable) {
                if (e.target.tagName !== 'INPUT') {
                    e.preventDefault()
                }
                this.isOpened = !this.isOpened

                if (this.isOpened) {
                    this.$refs.input.focus()
                }
            }
        },

        _onFocus() {
            if (!this.isOpened) {
                this.isOpened = true
            }
        },

        _onBlur($event) {
            if (!this.$el.contains($event.relatedTarget)) {
                this.isOpened = false
            }
        },

        _selectIndex(index) {
            if (this.multiple) {
                const selected = this.selectedIndexes

                if (selected.indexOf(index) !== -1) {
                    this.selectedIndexes = selected.filter(
                        _index => _index !== index
                    )
                } else {
                    this.selectedIndexes = selected.concat(index)
                }
            } else {
                this.selectedIndexes = [index]
            }
        },

        _selectOnClick($event) {
            let target = $event.target

            if (!target.hasAttribute('data-select-index')) {
                target = target.closest('[data-select-index]')
            }

            if (target) {
                $event.stopPropagation()
                $event.preventDefault()
                this._selectIndex(
                    parseInt(target.getAttribute('data-select-index'))
                )
            }
        },

        _selectOnEnter() {
            // close if nothing typed
            if (!this.searchPhrase) {
                this.isOpened = false
                this._close()
                return
            }

            const firstOption = this.optionsList[0]

            // select first option if search exists
            if (firstOption) {
                this._selectIndex(firstOption.index)
            } else {
                // emit not found
                this.isOpened = false
                this.$emit('not-found', this.searchPhrase)
                this.selectedIndexes = []
            }
        },

        _onClickNotEqual() {
            this.isOpened = false
            this.selectedIndexes = []
            this.$emit('not-equal', this.searchPhrase)
        },

        _onClickOutside($event) {
            if (!this.$el.contains($event.target)) {
                this.isOpened = false
            }
        },

        _toggleOutsideHandler(activate = false) {
            const method = activate ? 'addEventListener' : 'removeEventListener'

            document.body[method]('click', this._onClickOutside)
        },

        _close() {
            this.isOpened = false

            // blur, because select opens on focus
            if (typeof document !== 'undefined' && document.activeElement) {
                document.activeElement.blur()
            }
        },

        // ajax
        _preloadOptions() {
            switch (typeof this.searchPreload) {
                case 'boolean':
                    this.searchPreload &&
                        this.fetch().then(() => {
                            this.$emit('preloaded', this.selectOptions)
                        })
                    break
                case 'object':
                    this.selectOptions = Array.isArray(this.searchPreload)
                        ? this.searchPreload
                        : [this.searchPreload]
                    break
            }
        },

        toggleLoader(enable = false) {
            if (enable) {
                this._ltm = setTimeout(() => {
                    this.isLoading = true
                }, 200)
            } else {
                clearTimeout(this._ltm)
                this.isLoading = false
            }
        },

        async fetch() {
            this.cancelRequest()

            this.toggleLoader(true)

            this.cancellation = CancelToken.source()

            try {
                const fetchUrl = this.options(
                    encodeURIComponent(this.searchPhrase)
                )

                const { data } = await this.$axios.request({
                    cancelToken: this.cancellation.token,
                    method: 'get',
                    url: fetchUrl
                })

                this.selectOptions = pathOr([], 'data', data)
            } catch (e) {
                if (!isCancel(e)) {
                    console.log(e)
                }
            } finally {
                this.toggleLoader(false)
                this.cancellation = null
            }
        },

        cancelRequest() {
            if (this.cancellation) {
                this.cancellation.cancel()
            }
        }
    }
}
</script>
