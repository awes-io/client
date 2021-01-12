<template>
    <AwLayoutProvider class="aw-layout">
        <AwMobileMenu v-if="!$screen.lg">
            <template
                v-for="(index, name) in $scopedSlots"
                v-slot:[name]="data"
            >
                <slot :name="name" v-bind="data"></slot>
            </template>
        </AwMobileMenu>

        <AwLayoutMenu v-if="$screen.lg" class="aw-layout__aw-layout-menu">
            <template
                v-for="(index, name) in $scopedSlots"
                v-slot:[name]="data"
            >
                <slot :name="name" v-bind="data"></slot>
            </template>
        </AwLayoutMenu>

        <!-- main -->
        <slot />
    </AwLayoutProvider>
</template>

<script>
import AwLayoutProvider from '../AwLayoutProvider.vue'
import AwMobileMenu from '../AwMobileMenu.vue'
import AwLayoutMenu from '../AwLayoutMenu.vue'

export default {
    name: 'AwLayout',

    components: {
        AwLayoutProvider,
        AwMobileMenu,
        AwLayoutMenu
    },

    provide() {
        return { layout: 'default' }
    }
}
</script>
