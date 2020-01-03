<template>
    <div v-show="!!croppie" class="aw-cropper">
        <!-- image wrapped because of Croppie -->
        <div>
            <img :src="src" alt="" ref="image" />
        </div>

        <!-- upload -->
        <AwButton tag="label" class="appearance-none">
            <input
                type="file"
                ref="file"
                accept="image/*"
                class="sr-only"
                @change="bindImage"
            />
            <slot name="upload">
                {{ $t('AwCropper.upload') }}
            </slot>
        </AwButton>

        <slot name="buttons" :rotate="rotate" :save="save" :cancel="cancel">
            <!-- rotate -->
            <AwButton :text="$t('AwCropper.rotate')" @click="rotate" />

            <!-- save -->
            <AwButton :text="$t('AwCropper.save')" @click="save" />

            <!-- cancel -->
            <AwButton
                v-if="$listeners.cancel"
                :text="$t('AwCropper.cancel')"
                @click="cancel"
            />
        </slot>
    </div>
</template>

<script>
import { preventPinchResize } from '../assets/js/prevent-pinch-resize'
import loadjs from 'loadjs'

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
            default: 100
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

    inject: {
        modal: {
            from: 'modal',
            default: false
        }
    },

    methods: {
        loadCroppie() {
            return loadjs(
                [
                    'https://unpkg.com/croppie/croppie.min.js',
                    'https://unpkg.com/croppie/croppie.css'
                ],
                'croppie',
                { returnPromise: true }
            )
        },

        async initCroppie() {
            if (!('Croppie' in window)) {
                await this.loadCroppie()
            }
            this.croppie = new window.Croppie(this.$refs.image, {
                viewport: { width: +this.width, height: +this.height },
                boundary: {
                    width: +this.width + +this.padding,
                    height: +this.height + +this.padding
                },
                enableOrientation: true
            })
        },

        bindImage(e) {
            let file = e.target.files[0]
            if (!file) return
            let url = URL.createObjectURL(file)
            this.croppie.bind({ url })
        },

        rotate() {
            this.croppie.rotate(90)
        },

        async save() {
            let file = await this.croppie.result({
                type: 'blob',
                size: 'original',
                format: this.format,
                quality: this.quality
            })

            this.$emit('save', file)

            this.cancel()
        },

        cancel() {
            this.$emit('cancel')
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
