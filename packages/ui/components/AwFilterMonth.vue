<template>
    <div :class="[_cssClasses.base, , { default: format === 'DD.MM.YYYY' }]">
        <AwButton
            :disabled="prevDisabled"
            :size="_size"
            :class="_cssClasses.prev"
            icon="arrow-l"
            theme="system"
            @click="prev"
        />
        <slot :date="date">
            <div :class="_cssClasses.date">
                <div v-if="label" :class="_cssClasses.label">
                    {{ label }}
                </div>

                {{ date.format(format) }}
            </div>
        </slot>
        <AwButton
            :disabled="nextDisabled"
            :size="_size"
            :class="_cssClasses.next"
            icon="arrow-r"
            theme="system"
            @click="next"
        />
    </div>
</template>

<script>
import { isNil, omit } from 'rambdax'
import dayjs from 'dayjs'
import { getBemClasses } from '../assets/js/css'

export default {
    name: 'AwFilterMonth',

    props: {
        param: {
            type: String,
            default: 'date'
        },

        format: {
            type: String,
            default: 'DD.MM.YYYY'
        },

        debounce: {
            type: Number,
            default: 500
        },

        min: {
            type: [String, Object, Number, Date],
            default: null,
            validator(val) {
                return dayjs(val).isValid()
            }
        },

        max: {
            type: [String, Object, Number, Date],
            default: null,
            validator(val) {
                return dayjs(val).isValid()
            }
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
            date: dayjs()
        }
    },

    computed: {
        prevDisabled() {
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
            if (dayjs().isSame(this.date, 'month')) {
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
        const date = dayjs(_date, this.format)

        if (_date && date.isValid()) {
            this.date = this._clamp(date)
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
                _value = dayjs(this.min)
            }

            if (!isNil(this.max) && value.isAfter(this.max, 'month')) {
                _value = dayjs(this.max)
            }

            return _value
        }
    }
}
</script>
