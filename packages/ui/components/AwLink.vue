<template>
    <!-- eslint-disable-next-line vue/require-component-is -->
    <component :class="className" v-bind="componentProps" v-on="$listeners">
        <slot>{{ text }}</slot>
    </component>
</template>

<script>
import { conf } from '../assets/js/component'
import { AwLink as _config, LINK_REGEX, SPECIAL_URL_REGEX } from './_config'

export default {
    name: 'AwLink',

    _config,

    props: {
        href: [String, Object],

        className: {
            type: String,
            default() {
                return conf(this, 'baseClass')
            }
        },

        text: String,

        tag: String
    },

    computed: {
        componentProps() {
            // no href === button
            if (!this.href) {
                return {
                    is: this.tag || 'button',
                    role: (this.tag && 'button') || null,
                    type: this.$attrs.type || 'button'
                }
            }

            if (typeof this.href === 'string') {
                // test for external link
                if (this.href.match(LINK_REGEX)) {
                    return {
                        is: this.tag || 'a',
                        role: (this.tag && 'link') || null,
                        href: this.href,
                        target: '_blank',
                        rel: 'nofollow'
                    }
                }

                // test special link
                if (this.href.match(SPECIAL_URL_REGEX)) {
                    return {
                        is: this.tag || 'a',
                        role: (this.tag && 'link') || null,
                        href: this.href
                    }
                }
            }

            // default
            return {
                is: conf(this, 'routerComponent'),
                to: this.href
            }
        }
    }
}
</script>
