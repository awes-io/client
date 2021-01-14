<template>
    <Component
        :is="_linkComponent"
        :class="{ 'aw-icon-menu-item--clip': !tooltip }"
        class="aw-icon-menu-item focus-outline"
        v-bind="_linkAttrs"
        v-on="$listeners"
    >
        <slot v-bind="$props">
            <span
                :class="{ 'aw-icon-menu-item__icon-block--clip': !tooltip }"
                class="aw-icon-menu-item__icon-block"
                tabindex="-1"
            >
                <AwIcon
                    :name="icon"
                    :size="tooltip ? 20 : 24"
                    :class="{
                        'aw-icon-menu-item__icon--highlight': active
                    }"
                    class="aw-icon-menu-item__icon"
                />
                <span
                    v-if="badge"
                    class="aw-icon-menu-item__icon-badge"
                    :class="[
                        'bg-' + badge.color || 'error',
                        {
                            'aw-icon-menu-item__icon-badge--with-text':
                                badge.text
                        }
                    ]"
                >
                    {{ badge.text }}
                </span>
            </span>
            <span
                :class="
                    tooltip
                        ? 'aw-icon-menu-item__tooltip'
                        : 'aw-icon-menu-item__text'
                "
            >
                {{ text }}
            </span>
        </slot>
    </Component>
</template>

<script>
import linkMixin from '@AwMixins/link'

export default {
    name: 'AwMenuItemIcon',

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
            required: true
        },

        active: Boolean,

        tooltip: Boolean,

        badge: {
            type: Object,
            default: null,
            validator(badge) {
                return badge.color
                    ? [
                          'bg-success',
                          'bg-warning',
                          'bg-error',
                          'bg-info'
                      ].includes('bg-' + badge.color)
                    : true
            }
        }
    }
}
</script>
