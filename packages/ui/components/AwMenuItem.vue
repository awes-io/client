<template>
    <Component
        v-if="visible"
        :is="tag"
        class="aw-menu-item"
        :class="{
            'aw-menu-item_opened': opened,
            'aw-menu-item_expanded': expanded,
            'aw-menu-item_has-icon': !!icon,
            'aw-menu-item_has-badge': !!_badge,
            'aw-menu-item_has-toggler': hasChildren && !expanded,
            'aw-menu-item_has-active': hasActiveChild
        }"
    >
        <!-- default button -->
        <Component
            :is="href ? 'RouterLink' : 'button'"
            :class="{ 'is-active': isSamePage(href) }"
            :to="href || null"
            :aria-current="isSamePage(href) ? 'page' : null"
            v-bind="$attrs"
            v-on="!href && hasChildren ? { click: toggle } : {}"
            class="aw-menu-item__button"
        >
            <AwIcon v-if="icon" :name="icon" size="xl" class="mr-5" />
            <span class="truncate">{{ text }}</span>
            <AwBadge
                v-if="_badge"
                v-bind="_badge"
                class="aw-menu-item__badge"
            />
        </Component>

        <!-- submenu toggler -->
        <button
            v-if="hasChildren && !expanded"
            :aria-label="$t('AwLayoutDefault.toggleSubmenu')"
            @click.stop.prevent="toggle()"
            class="aw-menu-item__toggler"
        >
            <AwIconCaret size="10" class="aw-menu-item__caret" />
        </button>

        <!-- submenu -->
        <AwAccordionFold
            v-if="hasChildren"
            :show="opened || expanded"
            class="aw-menu-item__children"
        >
            <RouterLink
                v-for="(child, j) in visibleChildren"
                :key="`child-${j}`"
                :to="child.href"
                :aria-current="isSamePage(child.href) ? 'page' : null"
                :class="{ 'is-active': isSamePage(child.href) }"
                class="aw-menu-item__child"
            >
                <span class="truncate">{{ child.text }}</span>
            </RouterLink>
        </AwAccordionFold>
    </Component>
</template>

<script>
import { isEmpty, isType, isNil } from 'rambdax'
import { trimSlash } from '../assets/js/router'
import AwIcon from './AwIcon.vue'
import AwBadge from './AwBadge.vue'
import AwIconCaret from '../assets/svg/components/caret.vue'
import AwAccordionFold from './AwAccordionFold.vue'

export default {
    name: 'AwMenuItem',

    inheritAttrs: false,

    components: {
        AwIcon,
        AwBadge,
        AwIconCaret,
        AwAccordionFold
    },

    props: {
        tag: {
            type: String,
            default: 'li'
        },

        children: {
            type: Array,
            default: () => []
        },

        text: {
            type: String,
            default: ''
        },

        href: {
            type: String,
            default: ''
        },

        icon: {
            type: String,
            default: ''
        },

        badge: {
            type: Object,
            default: null
        },

        show: {
            type: [Boolean, Function],
            default: true
        },

        expanded: Boolean
    },

    data() {
        return {
            opened: false
        }
    },

    computed: {
        _badge() {
            if (isNil(this.badge) || isEmpty(this.badge)) {
                return null
            } else {
                return {
                    color: 'surface',
                    ...this.badge
                }
            }
        },

        visible() {
            return isType('Function', this.show)
                ? this.show()
                : this.show !== false
        },

        visibleChildren() {
            return this.children.filter(({ show }) =>
                isType('Function', show) ? show : show !== false
            )
        },

        hasChildren() {
            return this.visibleChildren.length
        },

        currentPath() {
            return trimSlash(this.$route.path)
        },

        hasActiveChild() {
            return this.visibleChildren.some(
                ({ href }) => !!href && this.isSamePage(href)
            )
        }
    },

    created() {
        if (!this.show || this.expanded || !this.hasChildren) return

        if ((this.href && this.isSamePage(this.href)) || this.hasActiveChild) {
            this.opened = true
        }
    },

    methods: {
        toggle() {
            this.opened = !this.opened
        },

        isSamePage(href) {
            return this.currentPath === trimSlash(href)
        }
    }
}
</script>
