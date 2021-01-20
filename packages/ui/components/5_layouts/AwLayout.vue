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
        <AwHeaderNotification />
        <slot />
    </AwLayoutProvider>
</template>

<script>
import AwLayoutProvider from '@AwLayouts/_AwLayoutProvider.vue'
import AwMobileMenu from '@AwLayouts/_AwMobileMenu.vue'
import AwLayoutMenu from '@AwLayouts/_AwLayoutMenu.vue'
import AwHeaderNotification from '@AwLayouts/_AwHeaderNotification.vue'

export default {
    name: 'AwLayout',

    components: {
        AwLayoutProvider,
        AwMobileMenu,
        AwLayoutMenu,
        AwHeaderNotification
    }
}
</script>
