<template>
    <nav v-if="items.length" class="aw-mobile-menu__menu">
        <h3 v-if="title">{{ title }}</h3>
        <ol>
            <slot name="before" />
            <li v-for="(item, i) in items" :key="i">
                <AwMobileMenuItem
                    v-bind="item"
                    :href="item.children.length ? null : item.href"
                    :arrow="!!item.children.length"
                    :active="isActive(item)"
                    v-on="
                        item.children.length
                            ? {
                                  click: () =>
                                      $emit('click:submenu', item.children)
                              }
                            : null
                    "
                />
            </li>
            <slot name="after" />
        </ol>
    </nav>
</template>

<script>
import { viewOr, lensProp } from 'rambdax'
import AwMobileMenuItem from '@AwLayouts/_AwMobileMenuItem.vue'

export default {
    name: 'AwMobileMenuNav',

    components: {
        AwMobileMenuItem
    },

    props: {
        items: {
            type: Array,
            default: () => []
        },

        title: {
            type: String,
            default: ''
        }
    },

    inject: {
        layoutProvider: {
            default: null
        }
    },

    computed: {
        activeMenuItem() {
            return viewOr(null, lensProp('activeMenuItem'), this.layoutProvider)
        }
    },

    methods: {
        isActive(item) {
            return item.children.length
                ? item.children.some((child) =>
                      child.children.length
                          ? child.children.some(
                                (subchild) => subchild === this.activeMenuItem
                            )
                          : child === this.activeMenuItem
                  )
                : item === this.activeMenuItem
        }
    }
}
</script>
