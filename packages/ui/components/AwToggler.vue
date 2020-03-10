<template>
    <transition
        name="collapse"
        @enter="open"
        @after-enter="removeMaxHeight"
        @leave="close"
        @after-leave="removeMaxHeight"
    >
        <div v-show="show" ref="wrapper" class="aw-toggler overflow-hidden">
            <div class="aw-toggler__content bg-muted-dark rounded p-4 relative">
                <!-- Content passed to component -->
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'AwToggler',

    props: {
        // Indicates if toggler is open or closed
        show: {
            type: Boolean,
            default: true
        }
    },

    methods: {
        open() {
            this.setMaxHeight()
            // Fire when the toggler is opened
            this.$emit('open')
        },

        close() {
            this.setMaxHeight()
            // Fire when the toggler is closed
            this.$emit('close')
        },

        setMaxHeight() {
            const maxHeight = this.$refs.wrapper.scrollHeight
            this.$refs.wrapper.style.maxHeight = `${maxHeight}px`
        },

        removeMaxHeight() {
            this.$refs.wrapper.style.maxHeight = null
        }
    }
}
</script>
