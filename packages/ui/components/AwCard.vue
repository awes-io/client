<template>
    <div :class="'rounded shadow-md ' + backgroundCss">
        <div class="px-6 py-4">
            <div class="text-xl mb-2" v-if="title != ''">
                <div v-if="link == ''" class="font-bold">
                    {{ title }}
                </div>
                <div v-else>
                    <AwLink :href="link" class="font-bold">{{ title }}</AwLink>
                </div>
            </div>
            <p class="text-gray-700 text-base" v-if="text != ''">
                {{ text }}
            </p>
            <slot />
        </div>
    </div>
</template>
<script>
export default {
    name: 'AwCard',
    props: {
        background: {
            type: String,
            default() {
                return ''
            }
        },
        title: {
            type: String,
            default() {
                return ''
            }
        },
        text: {
            type: String,
            default() {
                return ''
            }
        },
        // If present transforms title into link with given href
        link: {
            type: String,
            default() {
                return ''
            }
        }
    },
    computed: {
        backgroundCss() {
            if (this.background != '') {
                return 'bg-' + this.background
            }
            return 'bg-surface'
        }
    }
}
</script>
