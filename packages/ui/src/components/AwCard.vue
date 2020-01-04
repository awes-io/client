<template>
    <div class="rounded overflow-hidden shadow-lg">
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
        </div>
    </div>
</template>
<script>
export default {
    name: 'AwCard',
    props: {
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
        link: {
            type: String,
            default() {
                return ''
            }
        }
    }
}
</script>
