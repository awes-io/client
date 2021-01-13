<template>
    <div>
        <button
            :aria-label="$t('AwUserMenu.openMenu')"
            class="align-middle focus:outline-none rounded-full focus:shadow-outline"
            @click="isOpened = !isOpened"
        >
            <AwUserpic :src="avatar" :name="name" hide-name />
        </button>

        <AwDropdown
            v-if="isDesktop"
            :show.sync="isOpened"
            :options="{
                placement: 'bottom-end',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 10]
                        }
                    },
                    {
                        name: 'computeStyles',
                        options: {
                            adaptive: false
                        }
                    }
                ]
            }"
            class="mt-1 lg:mt-0"
            style="width: 300px"
        >
            <!-- <AwUserMenuContent v-bind="$props" v-on="$listeners"> -->
            <slot />
            <!-- </AwUserMenuContent> -->
        </AwDropdown>

        <template v-else>
            <Transition name="fade">
                <div
                    v-show="isOpened"
                    class="block w-screen h-screen fixed inset-0 bg-overlay opacity-50"
                    @click="isOpened = false"
                ></div>
            </Transition>

            <!-- <AwUserMenuContent
                v-bind="$props"
                v-on="$listeners"
                :class="{ 'is-visible': isOpened }"
                class="aw-usermenu-mobile z-20"
            >
                <slot />
            </AwUserMenuContent> -->
        </template>
    </div>
</template>

<script>
// import AwUserMenuContent from './AwUserMenuContent.vue'

const debounce = 150
let timeout = null

export default {
    name: 'AwUserMenu',

    // components: {
    //     AwUserMenuContent
    // },

    props: {
        /**
         * Path to user avatar image
         */
        avatar: {
            type: String,
            default: ''
        },

        /**
         * User name
         */
        name: {
            type: String,
            default: ''
        },

        /**
         * Additional info under user name
         */
        info: {
            type: String,
            default: ''
        },

        /**
         * Is dark mode enabled (for internal use)
         */
        darkTheme: Boolean
    },

    data() {
        return {
            isOpened: false,
            isDesktop: false
        }
    },

    watch: {
        $route() {
            this.isOpened = false
        }
    },

    mounted() {
        if (window) {
            window.addEventListener('resize', this.resizeHandler)
            this.resizeHandler()
        }
    },

    beforeDestroy() {
        if (window) {
            window.removeEventListener('resize', this.resizeHandler)
        }
    },

    methods: {
        resizeHandler() {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                this.isDesktop = window.innerWidth > 1023
            }, debounce)
        }
    }
}
</script>
