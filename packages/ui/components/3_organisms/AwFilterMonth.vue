<template>
    <div :class="[_cssClasses.base, , { default: format === 'DD.MM.YYYY' }]">
        <AwButton
            :disabled="prevDisabled"
            :size="_size"
            :class="_cssClasses.prev"
            theme="system"
            @click="prev"
        >
            <template #icon>
                <AwIconSystem name="arrow" size="16" />
            </template>
        </AwButton>
        <slot :date="date">
            <div :class="_cssClasses.date">
                <div
                    v-if="label"
                    :class="[_cssClasses.label, { 'mb-1': _size !== 'sm' }]"
                >
                    {{ label }}
                </div>

                {{ date.format(_displayFormat) }}
            </div>
        </slot>
        <AwButton
            :disabled="nextDisabled"
            :size="_size"
            :class="_cssClasses.next"
            theme="system"
            @click="next"
        >
            <template #icon>
                <AwIconSystem name="arrow" rotate="180" size="16" />
            </template>
        </AwButton>
    </div>
</template>

<script>
import { isNil, omit } from 'rambdax'
import { getBemClasses } from '@AwUtils/css'

export default {
    name: 'AwFilterMonth',

    props: {
        param: {
            type: String,
            default: 'date'
        },

        format: {
            type: String,
            default: 'YYYY-MM'
        },

        displayFormat: {
            type: String,
            default: null
        },

        debounce: {
            type: Number,
            default: 500
        },

        min: {
            type: [String, Object, Number, Date],
            default: null
            // validator(val) {
            //     return this.$dayjs(val).isValid()
            // }
        },

        max: {
            type: [String, Object, Number, Date],
            default: null
            // validator(val) {
            //     return this.$dayjs(val).isValid()
            // }
        },

        size: {
            type: String,
            default: null
        },

        label: {
            type: String,
            default: null
        }
    },

    _config: {
        baseClass: 'aw-filter-month'
    },

    data() {
        return {
            date: null
        }
    },

    computed: {
        prevDisabled() {
            if (!this.date) return undefined

            return (
                !isNil(this.min) &&
                this.date.subtract(1, 'month').isBefore(this.min, 'month')
            )
        },

        nextDisabled() {
            return (
                !isNil(this.max) &&
                this.date.add(1, 'month').isAfter(this.max, 'month')
            )
        },

        paramValue() {
            if (!this.date) return undefined

            if (this.$dayjs().isSame(this.date, 'month')) {
                return undefined
            } else {
                return this.date.format(this.format)
            }
        },

        _cssClasses() {
            const base = this.$options._config.baseClass
            return {
                base,
                ...getBemClasses(base, ['prev', 'next', 'date', 'label'])
            }
        },

        _size() {
            return this.size || (this.label ? 'lg' : 'md')
        },

        _displayFormat() {
            return this.displayFormat || this.format
        }
    },

    watch: {
        paramValue: {
            handler(newValue) {
                clearTimeout(this._tm)

                this._tm = setTimeout(() => {
                    const current = this.$route.query[this.param]

                    // do nothing if already set
                    if (current === newValue) return

                    // remove param
                    if (current && !newValue) {
                        return this.$router.replace({
                            ...this.$route,
                            query: omit(
                                [this.param, 'page', 'search'],
                                this.$route.query
                            )
                        })
                    }

                    // set param
                    return this.$router.replace({
                        ...this.$route,
                        query: {
                            ...omit('page,search', this.$route.query),
                            [this.param]: newValue
                        }
                    })
                }, this._debounce)
            },
            immediate: true
        }
    },

    created() {
        const _date = this.$route.query[this.param]
        const date = this.$dayjs(_date, this.format)

        if (_date && date.isValid()) {
            this.date = this._clamp(date)
        } else {
            this.date = this.$dayjs()
        }
    },

    beforeDestroy() {
        clearTimeout(this._tm)
    },

    methods: {
        prev() {
            this.date = this.date.subtract(1, 'month')
        },

        next() {
            this.date = this.date.add(1, 'month')
        },

        _clamp(value) {
            let _value = value.clone()

            if (!isNil(this.min) && value.isBefore(this.min, 'month')) {
                _value = this.$dayjs(this.min)
            }

            if (!isNil(this.max) && value.isAfter(this.max, 'month')) {
                _value = this.$dayjs(this.max)
            }

            return _value
        }
    }
}
</script>
