<template>
    <div
        class="aw-page-buttons"
        :class="{
            'aw-page-buttons--fixed': isFixed,
            'aw-page-buttons--stacked': !isFixed
        }"
    >
        <AwContextMenu
            v-if="isFixed && $scopedSlots.default"
            class="aw-page-buttons__aw-context-menu"
            :options="$options.dropdownOptions"
        >
            <slot />
        </AwContextMenu>
        <slot v-else />
    </div>
</template>

<script>
export default {
    name: 'AwPageButtons',

    props: {
        breakpoint: {
            type: String,
            default: 'lg'
        }
    },

    computed: {
        isFixed() {
            return !this.$screen[this.breakpoint]
        }
    },

    dropdownOptions: {
        placement: 'top-end',
        modifiers: [{ name: 'offset', options: { offset: [0, 8] } }]
    }
}
</script>
