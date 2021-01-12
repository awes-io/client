<template>
    <div class="aw-bottom-bar">
        <slot name="bottom-bar-items">
            <AwIconMenuItem
                v-for="(item, i) in items"
                :key="i"
                :active="item === activeMenuItem"
                v-bind="item"
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
                        size="24"
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
import { viewOr, lensProp } from 'rambdax'
import AwIconMenuItem from './AwIconMenuItem.vue'

export default {
    name: 'AwBottomBar',

    components: {
        AwIconMenuItem
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

        activeMenuItem() {
            return viewOr(null, lensProp('activeMenuItem'), this.layoutProvider)
        }
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
    min-height: 4rem;

    & > * {
        flex-basis: 100%;
        flex-grow: 1;
        flex-shrink: 1;
    }
}
</style>
