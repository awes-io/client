<template>
    <main>
        <div class="flex flex-wrap">
            <div
                class="w-1/2 md:w-1/4 p-4 border text-center"
                v-for="name in iconNames"
                :key="name"
            >
                <code>&lt;AwIcon name="{{ name }}" /&gt;</code> <br />
                <AwIcon :name="name" class="mt-4 mx-auto" size="2xl" />
            </div>
        </div>
    </main>
</template>

<script>
const iconNames = [
    'arrow-d',
    'arrow-l',
    'arrow-r',
    'arrow-u',
    'attention',
    'bed',
    'bed-filled',
    'bold',
    'bookmark',
    'bookmark-filled',
    'briefcase',
    'burger',
    'bubble-sms',
    'bubble-text',
    'check',
    'check-solid',
    'chevron-d',
    'chevron-l',
    'chevron-r',
    'chevron-u',
    'circle',
    'close',
    'close-sircle',
    'close-solid',
    'cog',
    'copy',
    'drag',
    'external',
    'eye-no',
    'eye',
    'font-size',
    'graph',
    'graph-alt',
    'home',
    'intelligence',
    'italic',
    'key',
    'key-small',
    'letter',
    'loader',
    'location',
    'lock',
    'lock-filled',
    'minus',
    'more-v',
    'more',
    'pause',
    'phone-text',
    'phone-sms',
    'phone-sms-big',
    'pie-chart',
    'pie-chart-empty',
    'pie-chart-solid',
    'plus',
    'plus-solid',
    'progress',
    'quote',
    'schedule',
    'search',
    'settings',
    'speaker',
    'speed',
    'storage',
    'triangle-d',
    'triangle-l',
    'triangle-r',
    'triangle-u',
    'triangle-solid-r',
    'upload',
    'user',
    'user-dots',
    'user-solid'
]

export default {
    data() {
        return {
            iconNames
        }
    }
}
</script>
