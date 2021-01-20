<template>
    <Component
        :is="_linkComponent"
        v-bind="_linkAttrs"
        :class="{ 'aw-mobile-menu-item--active': active }"
        class="aw-mobile-menu-item focus-outline"
        v-on="$listeners"
    >
        <slot>
            <AwIcon
                v-if="icon"
                :name="icon"
                class="aw-mobile-menu-item__icon"
            />
            <span class="aw-mobile-menu-item__text" tabindex="-1">
                {{ text }}
            </span>
            <AwIconSystemMono
                v-if="arrow"
                name="angle"
                rotate="180"
                size="32"
                class="aw-mobile-menu-item__arrow"
            />
        </slot>
    </Component>
</template>

<script>
import linkMixin from '@AwMixins/link'

export default {
    name: 'AwMobileMenuItem',

    mixins: [linkMixin],

    props: {
        text: {
            type: String,
            required: true
        },

        href: {
            type: [String, Object],
            default: ''
        },

        icon: {
            type: String,
            default: ''
        },

        arrow: Boolean,

        active: Boolean
    }
}
</script>
