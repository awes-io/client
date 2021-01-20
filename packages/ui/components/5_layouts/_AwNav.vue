<template>
    <nav class="aw-nav" @click="toggleChildren">
        <h3 v-if="title" class="aw-nav__title">{{ title }}</h3>

        <template v-for="(item, i) in items">
            <span :key="i" class="aw-nav__item">
                <AwNavItem
                    :href="item.href"
                    :class="{
                        'aw-nav__child--sub':
                            !item.children || !item.children.length,
                        'aw-nav__child--active': item === activeMenuItem
                    }"
                    class="aw-nav__child"
                    :[$options.TOGGLE_CHILDREN_ATTR]="item.href ? null : i"
                >
                    <AwIcon v-if="item.icon" size="16" :name="item.icon" />
                    <span>{{ item.text }}</span>
                </AwNavItem>

                <button
                    v-if="
                        item.children && item.children.length && !item.expanded
                    "
                    class="aw-nav__toggler"
                    :class="{ 'aw-nav__toggler--open': openedChildren[i] }"
                    :[$options.TOGGLE_CHILDREN_ATTR]="i"
                >
                    <AwIconSystemMono name="angle" size="16" />
                </button>
            </span>
            <!-- { children, href, icon, expanded, ...child } -->
            <!-- subnav -->
            <Component
                :is="item.expanded ? 'div' : 'AwAccordionFold'"
                v-if="item.children && item.children.length"
                :key="'children-' + i"
                :show="openedChildren[i]"
            >
                <AwNavItem
                    v-for="(subchild, j) in item.children"
                    :key="j"
                    :href="subchild.href"
                    :class="{
                        'aw-nav__child--active': subchild === activeMenuItem
                    }"
                    class="aw-nav__child truncate aw-nav__child--sub"
                >
                    <span>{{ subchild.text }}</span>
                </AwNavItem>
            </Component>
        </template>
    </nav>
</template>

<script>
import { viewOr, lensProp } from 'rambdax'
import AwNavItem from '@AwLayouts/_AwNavItem.vue'

const TOGGLE_CHILDREN_ATTR = 'data-toggle-children'

export default {
    name: 'AwNav',

    components: {
        AwNavItem
    },

    TOGGLE_CHILDREN_ATTR,

    props: {
        title: {
            type: String,
            default: ''
        },

        items: {
            type: Array,
            default: () => []
        }
    },

    inject: {
        layoutProvider: {
            default: null
        }
    },

    data() {
        return {
            openedChildren: []
        }
    },

    computed: {
        activeMenuItem() {
            return viewOr(null, lensProp('activeMenuItem'), this.layoutProvider)
        }
    },

    watch: {
        items: {
            handler(items) {
                this.openedChildren = items.map((item) => {
                    if (item.expanded) {
                        return null
                    }

                    return (
                        item === this.activeMenuItem ||
                        item.children.some(
                            (child) => child === this.activeMenuItem
                        )
                    )
                })
            },
            immediate: true
        }
    },

    methods: {
        toggleChildren($event) {
            const target = $event.target.hasAttribute(TOGGLE_CHILDREN_ATTR)
                ? $event.target
                : $event.target.closest('[' + TOGGLE_CHILDREN_ATTR + ']')

            if (!target) return

            const index = target.getAttribute(TOGGLE_CHILDREN_ATTR)

            this.$set(this.openedChildren, index, !this.openedChildren[index])
        }
    }
}
</script>
