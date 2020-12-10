<template>
    <span
        v-if="_tags.length"
        class="aw-tags"
        v-on="_hasClickListener ? { click: _emitOnClick } : null"
    >
        <template v-for="(tag, i) in _tags">
            <slot v-bind="tag" :index="i" :getColor="getColor">
                <Component
                    :is="tag.tag"
                    :key="tag.key"
                    :style="{ backgroundColor: tag.color }"
                    :data-tag-index="i"
                    :class="{ 'aw-tag--clickable': _hasClickListener }"
                    class="aw-tag"
                >
                    {{ tag.text }}
                </Component>
            </slot>
        </template>
    </span>
</template>

<script>
import { isType, memoize } from 'rambdax'
import { hashStringToIndex } from '../assets/js/string'
import { conf } from '../assets/js/component'
import { getEventTargetAttribute } from '../assets/js/events'
import { AwTags as _config } from './_config'

const isString = isType('String')

const memoizedHasher = memoize(hashStringToIndex)

export default {
    name: 'AwBadgesTags',

    _config,

    props: {
        /**
         * The set of tags separated by a comma.
         */
        tags: {
            type: [String, Array],
            default: '',
            validator(tags) {
                return Array.isArray(tags) ? tags.every(isString) : true
            }
        },

        colors: {
            type: Array,
            default() {
                return conf(this, 'colors')
            }
        }
    },

    computed: {
        _hasClickListener() {
            return typeof this.$listeners.click === 'function'
        },

        _tags() {
            const tag = this._hasClickListener ? 'button' : 'span'

            return (Array.isArray(this.tags)
                ? this.tags
                : isString(this.tags)
                ? this.tags.split(',')
                : []
            ).reduce((acc, _tag, i) => {
                const text = isString(_tag) && _tag.trim()

                if (text) {
                    return acc.concat({
                        text,
                        tag,
                        key: text + i,
                        color: this.getColor(text)
                    })
                }

                return acc
            }, [])
        }
    },

    methods: {
        getColor(str) {
            const index = memoizedHasher(str, this.colors.length)

            return this.colors[index]
        },

        _emitOnClick($event) {
            const index = getEventTargetAttribute(
                $event,
                'data-tag-index',
                this.$el
            )

            if (index) {
                this.$emit('click', this._tags[index], this._tags)
            }
        }
    }
}
</script>
