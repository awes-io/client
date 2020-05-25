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
            :class="{ 'is-active': isSamePage(href) || isParentPage(href) }"
            :to="callIfFunction(href) || null"
            :aria-current="isSamePage(href) ? 'page' : null"
            v-bind="$attrs"
            v-on="!href && hasChildren ? { click: toggle } : {}"
            class="aw-menu-item__button"
        >
            <AwIcon
                v-if="icon"
                :name="icon"
                size="xl"
                class="mr-5"
                :class="{ 'aw-menu-item__icon-colored': _iconColor }"
                :style="`color: ${_iconColor}`"
            />
            <span class="truncate">{{ callIfFunction(text) }}</span>
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
                :to="callIfFunction(child.href)"
                :aria-current="isSamePage(child.href) ? 'page' : null"
                :class="{
                    'is-active':
                        isSamePage(child.href) || isParentPage(child.href)
                }"
                class="aw-menu-item__child"
            >
                <span class="truncate">{{ callIfFunction(child.text) }}</span>
            </RouterLink>
        </AwAccordionFold>
    </Component>
</template>

<script>
import { isEmpty, isType, isNil, pathOr } from 'rambdax'
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
        /**
         * Wrapping component tag
         */
        tag: {
            type: String,
            default: 'li'
        },

        /**
         * Array of children: { text: <String>|<Function>, href: <String>|<Function> }
         */
        children: {
            type: Array,
            default: () => []
        },

        /**
         * Text inside the button
         */
        text: {
            type: [String, Function],
            default: ''
        },

        /**
         * Item link, if not provided, the `button` tag is rendered
         */
        href: {
            type: [String, Function],
            default: ''
        },

        /**
         * Icon name
         */
        icon: {
            type: String,
            default: ''
        },

        /**
         * Props for rendering AwBadge inside item
         */
        badge: {
            type: Object,
            default: null
        },

        /**
         * Icon color in any format, supported by CSS `color`
         */
        iconColor: {
            type: String,
            default: ''
        },

        /**
         * Should the item render (used for permission purposes)
         */
        show: {
            type: [Boolean, Function],
            default: true
        },

        /**
         * Should the item render without collapse button
         */
        expanded: Boolean,

        /**
         * Should the item or children be highlighted, when the nested route is active
         */
        highlightWhenParent: {
            type: Boolean,
            default: true
        }
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

        _config() {
            return pathOr({}, '$awesConfig.AwMenu', this)
        },

        _iconColor() {
            return this.iconColor || this._config.iconColor
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
            return this.currentPath === trimSlash(this.callIfFunction(href))
        },

        isParentPage(href) {
            return (
                this.highlightWhenParent && this.currentPath.indexOf(href) === 0
            )
        },

        callIfFunction(text) {
            return isType('Function', text) ? text() : text
        }
    }
}
</script>
