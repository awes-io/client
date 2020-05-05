<template>
    <transition
        name="collapse"
        @enter="open"
        @leave="close"
        @before-leave="isHidden = true"
        @after-enter="isHidden = false"
    >
        <div
            v-if="show"
            ref="wrapper"
            class="aw-toggler"
            :class="{ 'overflow-hidden': isHidden }"
        >
            <div
                class="aw-toggler__content bg-muted-dark rounded p-4 mt-3 relative"
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

    data() {
        return {
            isHidden: false
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
        }
    }
}
</script>
