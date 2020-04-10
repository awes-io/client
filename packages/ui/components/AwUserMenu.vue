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
            <div v-if="name || info" class="p-6 bg-muted">
                <h5 v-if="name" class="text-xl font-semibold">
                    {{ name }}
                </h5>

                <p
                    v-if="info"
                    class="mb-0 mt-1 text-xs text-grey leading-snug"
                    v-html="info"
                ></p>
            </div>

            <template v-if="$slots.default">
                <hr />

                <div class="px-6 pb-4 ">
                    <slot />
                </div>
            </template>

            <hr />

            <div class="px-6 py-2">
                <AwSwitcher
                    :checked="darkTheme"
                    :label="$t('AwUserMenu.darkTheme')"
                    @change="$emit('switch-dark-theme', $event)"
                />
            </div>

            <!-- navbar menu -->
            <div v-if="Object.keys(navbarMenu).length" class="lg:hidden">
                <hr />

                <ul class="list-none px-6 pb-4">
                    <li
                        v-for="{
                            component,
                            key,
                            props,
                            text,
                            listeners
                        } in navbarMenu"
                        :key="key"
                        class="mt-4"
                    >
                        <Component
                            :key="key"
                            :is="component"
                            v-bind="props"
                            v-on="listeners"
                        >
                            {{ typeof text === 'function' ? text() : text }}
                        </Component>
                    </li>
                </ul>
            </div>
        </AwDropdown>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AwUserpic from './AwUserpic.vue'
import AwDropdown from './AwDropdown.vue'
import AwSwitcher from './AwSwitcher.vue'

export default {
    name: 'AwUserMenu',

    components: {
        AwUserpic,
        AwDropdown,
        AwSwitcher
    },

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
            isOpened: false
        }
    },

    computed: {
        ...mapGetters('awesIo', ['navbarMenu'])
    }
}
</script>
