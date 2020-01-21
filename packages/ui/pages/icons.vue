<template>
    <AwPage title="Icons">
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
    </AwPage>
</template>

<script>
const iconNames = [
    'arrow-d',
    'arrow-l',
    'arrow-r',
    'arrow-u',
    'bold',
    'briefcase',
    'burger',
    'check',
    'chevron-d',
    'chevron-l',
    'chevron-r',
    'chevron-u',
    'circle',
    'close',
    'copy',
    'drag',
    'external',
    'eye-no',
    'eye',
    'font-size',
    'graph',
    'intelligence',
    'italic',
    'loader',
    'location',
    'minus',
    'more-v',
    'more',
    'plus',
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
    'upload',
    'user'
]

export default {
    data() {
        return {
            iconNames
        }
    }
}
</script>
