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
                @click="rotate"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="20"
                    height="20"
                    class="fill-current"
                >
                    <path
                        d="M256.5 8c66.2.1 126.4 26.2 170.8 68.7L463 41a24 24 0 0141 17v134a24 24 0 01-24 24H346a24 24 0 01-17-41l41.7-41.7a168 168 0 10-4 249.2 12 12 0 0116.3.5l39.7 39.7a12 12 0 01-.5 17.4A248 248 0 11256.5 8z"
                    />
                </svg>
            </AwButton>
        </div>

        <slot name="buttons" :rotate="rotate" :save="save">
            <!-- save -->
            <AwButton :text="$t('AwCropper.save')" @click="save" />
        </slot>
    </div>
</template>

<script>
import Croppie from 'croppie'
import { preventPinchResize } from '@AwUtils/prevent-pinch-resize'

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
