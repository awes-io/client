<template>
    <nav class="aw-nav" @click="toggleChildren">
        <h3 v-if="title" class="aw-nav__title">{{ title }}</h3>

        <template
            v-for="({ children, href, icon, expanded, ...child }, i) in items"
        >
            <span :key="i" class="aw-nav__item">
                <AwNavItem
                    :href="href"
                    :class="{ 'aw-nav__child--no-icon': !icon }"
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
import { getPath } from '../assets/js/router'
import AwNavItem from './AwNavItem.vue'

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
            return getPath(href) === this.currentPath
        }
    }
}
</script>

<style lang="postcss">
.aw-nav {
    @apply py-8;

    &__title {
        @apply text-xl font-heading mb-5 px-8 truncate;
    }

    &__item {
        display: flex;
        align-items: center;

        &:not(:first-child) {
            @apply mt-2;
        }
    }

    &__toggler {
        @apply -ml-8 p-1;

        svg {
            transform: rotate(-180deg);
            transition: 240ms transform;
        }

        &--open svg {
            transform: rotate(-90deg);
        }
    }

    &__child {
        max-width: 100%;
        color: inherit;
        @apply flex items-center py-2 px-8;

        & > svg {
            @apply mr-2;
        }

        & > span {
            @apply block truncate;
        }

        &--sub {
            @apply text-sm text-mono-600;
            position: relative;
            transition: 120ms color;

            &:hover,
            &:focus-visible {
                color: inherit;
            }

            &:before {
                display: block;
                width: 6px;
                height: 6px;
                margin-left: 5px;
                margin-top: -3px;
                border-radius: 50%;
                background-color: theme('colors.success');

                position: absolute;
                left: theme('spacing.8');
                top: 50%;
            }
        }

        &--sub,
        &--no-icon {
            padding-left: calc(theme('spacing.10') + 16px);
        }

        &--active {
            color: inherit;

            &:before {
                content: '';
            }
        }
    }
}
</style>
