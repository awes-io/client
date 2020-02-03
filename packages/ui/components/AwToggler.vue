<template>
    <div
        ref="wrapper"
        class="aw-toggler overflow-hidden"
        :style="{ height: `${currentHeight}px` }"
    >
        <div
            class="aw-toggler__content mt-3 bg-muted-dark rounded p-6 relative"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AwToggler',

    props: {
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
        open() {
            this.currentHeight = this.$refs.wrapper.scrollHeight
        },

        close() {
            this.currentHeight = 0
        }
    }
}
</script>
