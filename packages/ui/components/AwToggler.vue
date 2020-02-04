<template>
    <transition
        name="collapse"
        @enter="open"
        @after-enter="close"
        @leave="open"
        @after-leave="close"
    >
        <div v-show="show" ref="wrapper" class="aw-toggler overflow-hidden">
            <div
                class="aw-toggler__content mt-3 bg-muted-dark rounded p-6 relative"
            >
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
        // @vuese
        // Used to manually open the toggler. E.g. `this.$refs.toggler.open()`
        open() {
            const maxHeight = this.$refs.wrapper.scrollHeight
            this.$refs.wrapper.style.maxHeight = `${maxHeight}px`
        },

        // @vuese
        // Used to manually close the toggler. E.g. `this.$refs.toggler.close()`
        close() {
            this.$refs.wrapper.style.maxHeight = null
        }
    }
}
</script>
