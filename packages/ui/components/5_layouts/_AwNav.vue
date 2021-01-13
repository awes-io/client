<template>
    <nav class="aw-nav" @click="toggleChildren">
        <h3 v-if="title" class="aw-nav__title">{{ title }}</h3>

        <template
            v-for="({ children, href, icon, expanded, ...child }, i) in items"
        >
            <span :key="i" class="aw-nav__item">
                <AwNavItem
                    :href="href"
                    :class="{
                        'aw-nav__child--sub': !children || !children.length,
                        'aw-nav__child--active': isActive(href)
                    }"
                    class="aw-nav__child"
                    :[$options.TOGGLE_CHILDREN_ATTR]="href ? null : i"
                >
                    <AwIcon v-if="icon" size="16" :name="icon" />
                    <span>{{ child.text }}</span>
                </AwNavItem>

                <button
                    v-if="children && children.length && !expanded"
                    class="aw-nav__toggler"
                    :class="{ 'aw-nav__toggler--open': openedChildren[i] }"
                    :[$options.TOGGLE_CHILDREN_ATTR]="i"
                >
                    <AwIconSystem name="angle" size="16" />
                </button>
            </span>

            <!-- subnav -->
            <Component
                :is="expanded ? 'div' : 'AwAccordionFold'"
                v-if="children && children.length"
                :key="'children-' + i"
                :show="openedChildren[i]"
            >
                <AwNavItem
                    v-for="(subchild, j) in children"
                    :key="j"
                    :href="subchild.href"
                    :class="{
                        'aw-nav__child--active': isActive(subchild.href)
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
import { getPath } from '@AwUtils/router'
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

    data() {
        return {
            openedChildren: []
        }
    },

    computed: {
        currentPath() {
            return getPath(this.$route)
        }
    },

    watch: {
        items: {
            handler(items) {
                this.openedChildren = items.map(
                    ({ expanded, href, children }) => {
                        if (expanded) {
                            return null
                        }

                        return (
                            getPath(href) === this.currentPath ||
                            children.some((child) => this.isActive(child.href))
                        )
                    }
                )
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
        },

        isActive(href) {
            return this.currentPath.startsWith(getPath(href))
        }
    }
}
</script>
