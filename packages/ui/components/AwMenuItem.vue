<template>
    <Component
        v-if="visible"
        :is="tag"
        class="aw-menu-item"
        :class="{
            'aw-menu-item_opened': opened,
            'aw-menu-item_expanded': expanded,
            'aw-menu-item_has-icon': !!icon,
            'aw-menu-item_icon-padding': isIconPadding,
            'aw-menu-item_has-badge': !!_badge,
            'aw-menu-item_has-toggler': hasChildren && !expanded,
            'aw-menu-item_has-active': hasActiveChild
        }"
    >
        <!-- default button -->
        <Component
            :is="_href && !hasChildren ? 'RouterLink' : 'button'"
            :class="{ 'is-active': _isParentActive }"
            :to="_href || null"
            :aria-current="isSamePage(_href) ? 'page' : null"
            v-bind="_computedProps"
            v-on="hasChildren ? { click: toggle } : {}"
            class="aw-menu-item__button"
        >
            <AwIcon
                v-if="icon"
                :name="icon"
                size="xl"
                class="mr-5 w-5"
                :class="{ 'aw-menu-item__icon-colored': _iconColor }"
                :style="`color: ${_iconColor}`"
            />
            <span class="truncate">{{ _text }}</span>
            <AwBadge
                v-if="_badge"
                v-bind="_badge"
                class="aw-menu-item__badge ml-auto"
            />
            <span
                v-if="hasChildren && !expanded"
                :aria-label="$t('AwLayoutDefault.toggleSubmenu')"
                class="aw-menu-item__toggler"
                :class="{ 'ml-auto': !_badge }"
            >
                <AwIconCaret size="10" class="aw-menu-item__caret" />
            </span>
        </Component>

        <!-- submenu toggler -->
        <!-- <button
            v-if="hasChildren && !expanded"
            :aria-label="$t('AwLayoutDefault.toggleSubmenu')"
            @click.stop.prevent="toggle()"
            class="aw-menu-item__toggler"
        >
            <AwIconCaret size="10" class="aw-menu-item__caret" />
        </button> -->

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
                :aria-current="isStartsWith(child.href) ? 'page' : null"
                :class="{
                    'is-active': isStartsWith(child.href)
                }"
                class="aw-menu-item__child"
            >
                <span class="truncate">{{ child.text }}</span>
                <AwBadge
                    v-if="child.badge"
                    v-bind="child.badge"
                    class="aw-menu-item__badge"
                />
            </RouterLink>
        </AwAccordionFold>
    </Component>
</template>

<script>
import { isEmpty, isType, isNil, pathOr, partition, map } from 'rambdax'
import { trimSlash } from '../assets/js/router'
import AwIcon from './AwIcon.vue'
import AwBadge from './AwBadge.vue'
import AwIconCaret from '../assets/svg/components/caret.vue'
import AwAccordionFold from './AwAccordionFold.vue'
import { LINK_REGEX, SPECIAL_URL_REGEX } from './_config'

const LOCALE_RE = /^\/([a-z]{2}(-[A-Z]{2})?)?\/?$/

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
        hasChildren() {
            return this.visibleChildren.length
        },

        _href() {
            return this._callIfFunction(this.href)
        },

        _text() {
            return this._callIfFunction(this.text)
        },

        /* simple regex detects /, /en, /en/, /en-US, /en-US/ */
        _isRoot() {
            return LOCALE_RE.test(this._href)
        },

        _children() {
            return (this.children || []).map(item => {
                const [withFn, withoutFn] = partition(isType('Function'), item)

                if (!isEmpty(withFn)) {
                    Object.defineProperties(
                        withoutFn,
                        map(
                            val => ({
                                get: val
                            }),
                            withFn
                        )
                    )
                }

                return withoutFn
            })
        },

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

        _computedProps() {
            if (typeof this.href === 'string') {
                // test for external link
                if (this.href.match(LINK_REGEX)) {
                    return {
                        ...this.$attrs,
                        role: 'link',
                        href: this.href,
                        target: '_blank',
                        rel: 'nofollow'
                    }
                }

                // test special link
                if (this.href.match(SPECIAL_URL_REGEX)) {
                    return {
                        ...this.$attrs,
                        is: 'a',
                        role: 'link',
                        href: this.href
                    }
                }
            }

            return this.$attrs
        },

        _isParentActive() {
            if (this.hasChildren) {
                return this.hasActiveChild
            }

            return this.isStartsWith(this._href)
        },

        visible() {
            return isType('Function', this.show)
                ? this.show()
                : this.show !== false && (this.href || this.hasChildren)
        },

        visibleChildren() {
            return this._children.filter(({ show }) => show !== false)
        },

        currentPath() {
            return trimSlash(this.$route.path)
        },

        hasActiveChild() {
            return this.visibleChildren.some(
                ({ href }) => !!href && this.isStartsWith(href)
            )
        },

        isIconPadding() {
            return this.$parent.isIcon
        }
    },

    created() {
        if (!this.show || this.expanded || !this.hasChildren) return

        if (
            (this._href && this.isSamePage(this._href)) ||
            this.hasActiveChild
        ) {
            this.opened = true
        }
    },

    methods: {
        toggle() {
            this.opened = !this.opened
        },

        isSamePage(href) {
            return this.currentPath === trimSlash(href)
        },

        isStartsWith(href) {
            return this._isRoot
                ? this.isSamePage(href)
                : this.currentPath.indexOf(trimSlash(href)) === 0
        },

        isParentPage() {
            return this.highlightWhenParent && this.hasActiveChild
        },

        _callIfFunction(text) {
            return isType('Function', text) ? text() : text
        }
    }
}
</script>
