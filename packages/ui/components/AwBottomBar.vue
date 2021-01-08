<template>
    <div class="aw-bottom-bar">
        <slot name="bottom-bar-items" v-bind="{ items, getIconProps }">
            <AwIconMenuItem
                v-for="item in items"
                :key="item.key"
                v-bind="getIconProps(item)"
            />
        </slot>

        <slot name="bottom-bar-toggler">
            <AwIconMenuItem
                :text="$t('AwBottomBar.menu')"
                icon="menu"
                @click="$store.commit('awesIo/TOGGLE_MOBILE_MENU')"
            >
                <template #default="{ icon, active, text }">
                    <AwIconSystem
                        name="more"
                        class="aw-icon-menu-item__icon text-brand"
                        size="30"
                    />
                    <span class="aw-icon-menu-item__text">
                        {{ text }}
                    </span>
                </template>
            </AwIconMenuItem>
        </slot>
    </div>
</template>

<script>
import { pick, keys } from 'rambdax'
import AwIconMenuItem from './AwIconMenuItem.vue'

export default {
    name: 'AwBottomBar',

    components: {
        AwIconMenuItem
    },

    props: {
        items: {
            type: Array,
            default: () => []
        }
    },

    methods: {
        getIconProps: pick(keys(AwIconMenuItem.props))
    }
}
</script>

<style lang="postcss">
.aw-bottom-bar {
    display: flex;

    color: black;
    background: white;
    box-shadow: 0 0 15px lightgray;

    position: sticky;
    bottom: 0;

    & > * {
        flex-basis: 100%;
        flex-grow: 1;
        flex-shrink: 1;
    }
}
</style>
