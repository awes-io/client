<template>
    <Component
        :is="_linkComponent"
        v-bind="_linkAttrs"
        v-on="$listeners"
        class="aw-mobile-menu-item"
    >
        <slot v-bind="$props">
            <span class="aw-mobile-menu-item__text">{{ text }}</span>
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

        arrow: Boolean
    }
}
</script>

<style lang="postcss">
.aw-mobile-menu-item {
    @apply bg-surface py-4 px-6;
    display: flex;
    align-items: center;
    width: 100%;

    &:hover,
    &:focus {
        oultine: none;
        text-decoration: none;
    }

    & + & {
        border-top: 1px solid rgb(var(--c-mono-800));
    }

    &__icon {
        @apply mr-3;
    }

    &__text {
        @apply truncate;
        flex-grow: 1;
    }

    &__arrow {
        @apply ml-2;
    }
}
</style>
