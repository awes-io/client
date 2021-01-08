<template>
    <Component :is="tag" :style="sizeVariables" class="aw-avatar">
        <!-- image  -->
        <slot v-bind="{ src, name, initials, color, imageError }">
            <img
                v-if="src && !imageError"
                :src="src"
                :alt="name || ''"
                @load="onLoad"
                @error="onLoadError"
            />
            <span
                v-if="
                    (imageError || !src) &&
                        (type === 'initials' || type === 'empty')
                "
                :style="{
                    backgroundColor: color
                }"
            >
                {{ type === 'initials' ? initials : '' }}
            </span>
        </slot>

        <!-- no image placeholder -->
        <slot name="no-img" :initials="initials" :color="color">
            <svg
                v-if="(imageError || !src) && type === 'no-img'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
                class="aw-avatar__no-img-icon"
            >
                <path
                    :fill="color"
                    d="M248 8a248 248 0 100 496 248 248 0 000-496zm0 96a88 88 0 110 176 88 88 0 010-176zm0 344c-59 0-111-27-146-68 18-36 55-60 98-60l7 1c13 4 27 7 41 7s28-3 41-7l7-1c43 0 80 24 99 60-36 41-88 68-147 68z"
                />
            </svg>
        </slot>

        <!-- loading indicator -->
        <slot name="loading" :isLoading="isLoading">
            <span v-if="isLoading" class="aw-avatar__loader"></span>
        </slot>
    </Component>
</template>

<script>
import { memoize } from 'rambdax'
import { hashStringToIndex } from '../../assets/js/string'
import { conf } from '../../assets/js/component'
import { AwAvatar as _config } from '../_config'

const memoizedHasher = memoize(hashStringToIndex)

export default {
    name: 'AwAvatar',

    _config,

    props: {
        // wrapper tag
        tag: {
            type: String,
            default: 'span'
        },

        // Full URL to the picture
        src: {
            type: String,
            default: ''
        },

        // User name
        name: {
            type: String,
            default: ''
        },

        // Size of the image
        size: {
            type: [Number, String],
            default: null,
            validator(val) {
                return !isNaN(val * 1)
            }
        },

        // Type of the rendered image.
        type: {
            type: String,
            // initials , empty, no-img
            default: 'initials',
            validator(value) {
                return ['initials', 'empty', 'no-img'].includes(value)
            }
        },

        // To bring the color to the rounded background.
        isColored: {
            type: Boolean,
            default: true
        },

        // Show loading indicator
        loading: Boolean,

        colors: {
            type: Array,
            default() {
                return conf(this, 'colors')
            }
        }
    },

    data() {
        return {
            imageError: false,
            imageLoading: false
        }
    },

    computed: {
        sizeVariables() {
            const size = this.size * 1

            if (size && !isNaN(size)) {
                return {
                    '--ui-avatar-size': size + 'px',
                    '--ui-avatar-font-size': (size / 36).toFixed(2) + 'rem'
                }
            }

            return null
        },

        // Convert user name to 2 first letters
        initials() {
            const name = this.name
                .replace(/[^ \u0041-\u005a\u0061-\u007A\u00DF-\u1EF3]/g, '')
                .trim()

            return name
                .split(' ')
                .reduce(
                    (acc, word) =>
                        acc.length < 2 ? acc + (word.charAt(0) || '') : acc,
                    ''
                )
        },

        // Get random color from the preset list
        color() {
            if (!this.isColored) return null

            const index = memoizedHasher(this.name.trim(), this.colors.length)

            return this.colors[index]
        },

        isLoading() {
            return this.loading || this.imageLoading
        }
    },

    watch: {
        src(val) {
            this.imageLoading = !!val
        }
    },

    methods: {
        onLoad() {
            this.imageLoading = false
        },

        onLoadError() {
            this.imageLoading = false
            this.imageError = true
        }
    }
}
</script>
