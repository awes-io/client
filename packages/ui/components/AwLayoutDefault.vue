<template>
    <div id="layout-default" class="layout layout--default">
        <!-- main -->
        <div
            class="layout__content"
            :class="{ 'is-wide': menuThin, 'relative z-0': showMobileMenu }"
        >
            <div class="layout__header">
                <!-- mobile menu toggler -->
                <AwButton
                    theme="icon"
                    class="md:hidden"
                    @click="showMobileMenu = !showMobileMenu"
                >
                    <AwIcon name="burger" size="lg" />
                    <span class="sr-only">
                        {{ $t('AwLayoutDefault.toggleMenu') }}
                    </span>
                </AwButton>

                <RouterLink
                    to="/"
                    class="pl-4 truncate md:hidden"
                    v-html="$t('AwLayoutDefault.caption')"
                />

                <div class="container flex">
                    <!-- navbar-->
                    <slot name="navbar" />
                </div>
            </div>

            <!-- content -->
            <slot />

            <!-- copyright -->
            <div
                class="bg-muted mt-auto text-center text-sm text-disabled footer__link"
            >
                <div
                    v-html="$t('AwLayoutDefault.footer')"
                    class="container py-4"
                ></div>
            </div>
        </div>

        <!-- mobile navigation overlay -->
        <Transition name="fade">
            <button
                v-show="showMobileMenu"
                class="block w-full fixed inset-0 bg-overlay opacity-50 md:hidden"
                @click="showMobileMenu = false"
            >
                <span class="sr-only">
                    {{ $t('AwLayoutDefault.toggleMenu') }}
                </span>
            </button>
        </Transition>

        <!-- navigation -->
        <nav
            class="layout__nav bg-brand"
            :class="{ 'is-thin': menuThin, 'is-visible': showMobileMenu }"
        >
            <div class="layout__aside-logo">
                <!-- shrink menu toggler -->
                <AwButton
                    class="hidden md:block absolute right-0 top-0 mt-1 mr-2"
                    theme="icon"
                    @click="menuThin = !menuThin"
                >
                    <AwIcon name="burger" size="lg" />
                    <span class="sr-only">
                        {{ $t('AwLayoutDefault.shrinkMenu') }}
                    </span>
                </AwButton>

                <!-- close mobile menu toggler -->
                <AwButton
                    class="block md:hidden mr-4"
                    theme="icon"
                    @click="showMobileMenu = false"
                >
                    <AwIcon name="close" size="lg" />
                    <span class="sr-only">
                        {{ $t('AwLayoutDefault.toggleMenu') }}
                    </span>
                </AwButton>

                <RouterLink
                    class="layout__aside-logo-inner truncate"
                    to="/"
                    v-html="$t('AwLayoutDefault.caption')"
                />
            </div>

            <!-- menu -->
            <ul class="layout__menu">
                <li
                    v-for="({ children, href, ...buttonAttrs }, i) in menuItems"
                    :key="`item-${i}`"
                    class="layout__menu-item"
                    :class="{
                        'is-opened': !menuThin && toggled.includes(i),
                        'is-icon': menuThin
                    }"
                >
                    <!-- default button -->
                    <AwButton
                        v-bind="{ ...buttonAttrs }"
                        theme="toggle"
                        size="lg"
                        class="w-full truncate text-left text-base normal-case font-normal tracking-normal"
                        :class="[
                            {
                                'is-text-active': href === $route.path
                            },
                            children && children.length ? 'pr-12' : 'pr-6'
                        ]"
                        :active="isActive({ href, children, i })"
                        :title="menuThin && buttonAttrs.text"
                        v-on="
                            children && children.length
                                ? { click: () => toggle(i) }
                                : { click: () => goToPage(href) }
                        "
                    />

                    <!-- submenu toggler -->
                    <Transition name="fade" v-if="children && !menuExpanded">
                        <AwButton
                            v-show="!menuThin"
                            theme="icon"
                            class="absolute z-1 layout__menu-caret"
                            @click.stop.prevent="toggle(i)"
                        >
                            <AwIcon size="sm" name="chevron-r" />
                            <span class="sr-only">
                                {{ $t('AwLayoutDefault.toggleSubmenu') }}
                            </span>
                        </AwButton>
                    </Transition>

                    <!-- submenu -->
                    <AwAccordionFold
                        v-if="children"
                        :show="
                            !menuThin && (toggled.includes(i) || menuExpanded)
                        "
                        class="relative"
                    >
                        <div
                            v-if="!menuExpanded"
                            class="bg-overlay absolute inset-0 opacity-10"
                        ></div>
                        <AwButton
                            v-for="(child, j) in children"
                            :key="`child-${j}`"
                            v-bind="{
                                icon: 'minus',
                                ...child
                            }"
                            theme="toggle"
                            class="w-full truncate text-left text-sm normal-case font-normal pl-12"
                            :class="{
                                'is-text-active': child.href === $route.path
                            }"
                        />
                    </AwAccordionFold>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { difference, isFalsy } from 'rambdax'
import AwIcon from './AwIcon.vue'
import AwButton from './AwButton.vue'

const menuSort = (a, b) => a.order > b.order

export default {
    name: 'AwLayoutDefault',

    components: {
        AwIcon,
        AwButton
    },

    props: {
        menu: {
            type: Array,
            default: () => []
        },

        menuExpanded: Boolean
    },

    data() {
        return {
            toggled: [],
            menuThin: false,
            showMobileMenu: false
        }
    },

    computed: {
        menuItems() {
            return this.menu
                .map(({ props, order, children }) => ({
                    ...props,
                    order,
                    children:
                        !isFalsy(children) &&
                        children
                            .map(({ props, order }) => ({ ...props, order }))
                            .sort(menuSort)
                }))
                .sort(menuSort)
        }
    },

    watch: {
        // reset toggled items if menu chnges
        menuItems: {
            handler(items) {
                const toggled = []
                for (let i = 0, l = items.length; i < l; i++) {
                    if (
                        items[i].children &&
                        items[i].children.some(
                            child => child.href === this.$route.path
                        )
                    ) {
                        toggled.push(i)
                        break
                    }
                }
                this.toggled = toggled
            },
            immediate: true
        }
    },

    methods: {
        toggle(index) {
            this.toggled = this.toggled.includes(index)
                ? difference(this.toggled, [index])
                : this.toggled.concat([index])
        },

        isActive({ href, children, i }) {
            return (
                !this.menuExpanded &&
                ((!this.menuThin && this.toggled.includes(i)) ||
                    href === this.$route.path ||
                    (children &&
                        children.some(
                            child => child.href === this.$route.path
                        )))
            )
        },

        goToPage(href) {
            this.showMobileMenu = false
            this.$router.push(href)
        }
    }
}
</script>
