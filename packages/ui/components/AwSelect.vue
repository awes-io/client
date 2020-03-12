<template>
    <div
        class="relative"
        @keydown.up="_arrowFocusItem(-1, $event)"
        @keydown.down="_arrowFocusItem(+1, $event)"
    >
        <!-- value -->
        <input
            v-if="name"
            type="hidden"
            tabindex="-1"
            :name="name"
            :value="JSON.stringify(_getValue(selected))"
            @invalid.prevent="
                $refs.input.setError($event.target.validationMessage)
            "
        />

        <!-- show label -->
        <AwInput
            ref="input"
            :value="isSearching ? searchPhrase : _getLabel(selected)"
            :label="label"
            :class="{ 'is-filled': isOpened }"
            :placeholder="_getLabel(selected)"
            v-bind="$attrs"
            @focus="_onFocus"
            @blur="_onBlur"
            @input="_applySearch"
            @keydown.enter="_selectOnEnter"
            :readonly="!searchable"
            autocomplete="off"
            data-arrow-focus
        >
            <template #icon>
                <AwButton
                    v-if="clearable"
                    v-show="!isOpened && selected"
                    @click="selectedIndex = null"
                    icon="close"
                    theme="icon"
                />
                <AwButton tabindex="-1" theme="icon" @click="toggleDropdown">
                    <AwIcon
                        v-if="isLoading"
                        key="loader"
                        name="loader"
                        size="xl"
                        class="text-brand animation-rotate"
                    />
                    <AwIcon
                        v-else
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

                <!-- options list -->
                <template v-if="optionsList.length">
                    <AwDropdownButton
                        v-for="({ optionLabel, index, active },
                        i) in optionsList"
                        :key="`${optionLabel}-${index}`"
                        :active="active"
                        @click="selectedIndex = index"
                        tabindex="-1"
                        data-arrow-focus
                    >
                        <slot
                            name="option-label"
                            v-bind="{ ...optionsList[i], searchPhrase }"
                        >
                            {{ optionLabel }}
                        </slot>
                    </AwDropdownButton>
                </template>

                <!-- not found -->
                <AwDropdownButton
                    v-else
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
import { path, pathOr, split, isNil } from 'rambdax'
import CancelToken from 'axios/lib/cancel/CancelToken'
import isCancel from 'axios/lib/cancel/isCancel'
import AwDropdownButton from './AwDropdownButton.vue'
import arrowFocusMixin from '../mixins/arrow-focus'

export default {
    inheritAttrs: false,

    name: 'AwSelect',

    components: {
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

        optionValue: {
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

        name: {
            type: String,
            default: ''
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
        }
    },

    data() {
        return {
            isOpened: false,
            isSearching: false,
            searchPhrase: '',
            selectOptions: [],
            optionSelected: this.value,

            // ajax
            cancellation: null,
            isLoading: false
        }
    },

    computed: {
        selected: {
            get() {
                return this.selectOptions[this.selectedIndex]
            },

            set(value) {
                value = this._getValue(value)
                this.optionSelected = value
                this.$emit('input', value, this.selected)
                this.isOpened = false
            }
        },

        selectedIndex: {
            get() {
                return this.selectOptions.findIndex(
                    this.optionValue
                        ? option =>
                              option[this.optionValue] === this.optionSelected
                        : option => option === this.optionSelected
                )
            },

            set(index) {
                this.selected = this.selectOptions[index]
                // blur, because select opens on focus
                if (document.activeElement) {
                    document.activeElement.blur()
                }
            }
        },

        optionsList() {
            return this.selectOptions.reduce((acc, option, index) => {
                const active = index === this.selectedIndex
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

        _optionLabelPath() {
            return !!this.optionLabel && split('.', this.optionLabel)
        },

        _optionValuePath() {
            return !!this.optionValue && split('.', this.optionValue)
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
                    option => this._getLabel(option) === this.searchPhrase
                )
            )
        }
    },

    watch: {
        value(value) {
            this.optionSelected = value
            this.$refs.input.setError()
        },

        isOpened(opened) {
            if (opened) {
                this.searchPhrase = ''
                this.isSearching = !!this.searchable
                this._toggleOutsideHandler(true)
                if (!this.selected && this._isAjax && !!this.searchPreload) {
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
                  });
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
            return this.optionLabel
                ? path(this._optionLabelPath, option)
                : option
        },

        _getValue(option) {
            return this.optionValue
                ? path(this._optionValuePath, option)
                : option
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

        toggleDropdown() {
            if (this.isOpened) {
                this.isOpened = false
            } else {
                this.$refs.input.focus()
            }
        },

        _onFocus() {
            if (!this.isOpened) {
                setTimeout(() => {
                    this.isOpened = true
                }, 5)
            }
        },

        _onBlur($event) {
            if (!this.$el.contains($event.relatedTarget)) {
                this.isOpened = false
            }
        },

        _selectOnEnter() {
            // close if nothing typed
            if (!this.searchPhrase) {
                this.isOpened = false
                this.selectedIndex = isNil(this.selectedIndex)
                    ? null
                    : this.selectedIndex
                return
            }

            const firstOption = this.optionsList[0]

            // select first option if search exists
            if (firstOption) {
                this.selectedIndex = firstOption.index
            } else {
                // emit not found
                this.isOpened = false
                this.$emit('not-found', this.searchPhrase)
                this.selectedIndex = null
            }
        },

        _onClickNotEqual() {
            this.isOpened = false
            this.selectedIndex = null
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
