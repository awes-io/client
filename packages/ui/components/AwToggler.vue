<template>
    <div
        ref="wrapper"
        class="aw-toggler overflow-hidden"
        :style="{ height: `${currentHeight}px` }"
    >
        <div
            class="aw-toggler__content mt-3 bg-muted-dark rounded p-6 relative"
        >
            <!-- Content passed to component -->
            <slot></slot>
        </div>
    </div>
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
            currentHeight: 0
        }
    },

    watch: {
        show(val) {
            if (val) {
                this.open()
            } else {
                this.close()
            }
        }
    },

    mounted() {
        if (this.show) {
            this.open()
        }
    },

    methods: {
        // @vuese
        // Used to manually open the toggler. E.g. `this.$refs.toggler.open()`
        open() {
            this.currentHeight = this.$refs.wrapper.scrollHeight
        },

        // @vuese
        // Used to manually close the toggler. E.g. `this.$refs.toggler.close()`
        close() {
            this.currentHeight = 0
        }
    }
}
</script>
