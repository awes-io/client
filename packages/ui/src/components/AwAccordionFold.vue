<template>
    <transition
        name="collapse"
        @enter="setMaxHeight"
        @after-enter="removeMaxHeight"
        @leave="setMaxHeight"
        @after-leave="removeMaxHeight"
    >
        <component :is="tag" v-show="show" class="collapse">
            <slot />
        </component>
    </transition>
</template>

<script>
export default {
    name: 'AwAccordionFold',

    props: {
        show: {
            type: Boolean,
            default: false
        },

        tag: {
            type: String,
            default: 'div'
        }
    },

    methods: {
        setMaxHeight(el) {
            const maxHeight = el.scrollHeight
            this.$el.style.maxHeight = `${maxHeight}px`
        },

        removeMaxHeight() {
            this.$el.style.maxHeight = null
        }
    }
}
</script>
