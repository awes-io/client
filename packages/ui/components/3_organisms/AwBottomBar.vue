<template>
    <div class="aw-bottom-bar">
        <slot name="bottom-bar-items">
            <AwMenuItemIcon
                v-for="(item, i) in items"
                :key="i"
                :active="item === activeMenu"
                v-bind="_pickItemProps(item)"
            />
        </slot>

        <slot name="bottom-bar-toggler">
            <AwMenuItemIcon
                :text="$t('AwBottomBar.menu')"
                icon="menu"
                @click="$store.commit('awesIo/TOGGLE_MOBILE_MENU')"
            >
                <template #default="{ text }">
                    <span
                        class="aw-icon-menu-item__icon-block aw-icon-menu-item__icon-block--clip"
                        tabindex="-1"
                    >
                        <AwIconSystemMono
                            name="more"
                            class="aw-icon-menu-item__icon"
                            size="24"
                        />
                    </span>
                    <span class="aw-icon-menu-item__text">
                        {{ text }}
                    </span>
                </template>
            </AwMenuItemIcon>
        </slot>
    </div>
</template>

<script>
import { viewOr, lensProp, omit } from 'rambdax'
import AwMenuItemIcon from '@AwLayouts/_AwMenuItemIcon.vue'

export default {
    name: 'AwBottomBar',

    components: {
        AwMenuItemIcon
    },

    inject: {
        layoutProvider: {
            default: null
        }
    },

    computed: {
        items() {
            const items = viewOr([], lensProp('mainMenu'), this.layoutProvider)

            return items.slice(0, 4)
        },

        activeMenu() {
            return viewOr(null, lensProp('activeMenu'), this.layoutProvider)
        }
    },

    methods: {
        _pickItemProps(props) {
            return omit('children', props)
        }
    }
}
</script>
