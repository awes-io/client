<template>
    <div
        v-show="!!croppie"
        class="aw-cropper"
        :style="{ width: totalWidth + 'px' }"
    >
        <!-- image wrapped because of Croppie -->
        <div class="aw-cropper__croppie">
            <img :src="src" alt="" ref="image" />

            <AwButton
                class="aw-cropper__rotate"
                content-class="px-2"
                theme="icon"
                :text="$t('AwCropper.rotate')"
                color="default"
                icon="redo-alt"
                @click="rotate"
            />
        </div>

        <slot name="buttons" :rotate="rotate" :save="save">
            <!-- save -->
            <AwButton :text="$t('AwCropper.save')" @click="save" />
        </slot>
    </div>
</template>

<script>
import Croppie from 'croppie'
import { preventPinchResize } from '../assets/js/prevent-pinch-resize'

export default {
    name: 'AwCropper',

    props: {
        src: {
            type: String,
            required: true
        },

        width: {
            type: [String, Number],
            default: 200
        },

        height: {
            type: [String, Number],
            default: 200
        },

        padding: {
            type: [String, Number],
            default: 70
        },

        format: {
            type: String,
            default: 'png'
        },

        quality: {
            type: [String, Number],
            default: 1
        }
    },

    data() {
        return {
            croppie: null
        }
    },

    computed: {
        totalWidth() {
            return +this.width + +this.padding
        }
    },

    methods: {
        initCroppie() {
            this.croppie = new Croppie(this.$refs.image, {
                viewport: {
                    width: +this.width,
                    height: +this.height,
                    type: 'circle'
                },
                boundary: {
                    width: this.totalWidth,
                    height: +this.height + +this.padding
                },
                enableOrientation: true
            })
        },

        rotate() {
            this.croppie.rotate(-90)
        },

        async save() {
            let file = await this.croppie.result({
                type: 'blob',
                size: 'original',
                format: this.format,
                quality: this.quality
            })

            this.$emit('save', file)
        }
    },

    mounted() {
        preventPinchResize(true)
        this.$nextTick(this.initCroppie)
    },

    beforeDestroy() {
        preventPinchResize(false)
        this.croppie && this.croppie.destroy()
    }
}
</script>
