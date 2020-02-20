<template functional>
    <div :class="`bg-${props.type}`" class="aw-noty">
        <!-- icon -->
        <Component
            :is="$options.components.AwIcon"
            v-if="typeof props.icon === 'string' && props.icon"
            :name="props.icon"
            size="2xl"
            class="aw-noty__icon"
        />

        <!-- content -->
        <div class="aw-noty__content">
            <div class="aw-noty__title">{{ props.title }}</div>
            <div
                v-if="props.text"
                v-html="$options.sanitize(props.text)"
                class="aw-noty__text"
            ></div>
        </div>

        <!-- close button -->
        <button
            v-if="props.remove"
            @click="props.remove"
            class="aw-noty__button"
        >
            <Component :is="$options.components.AwIcon" name="close" />
        </button>
    </div>
</template>

<script>
import { clone } from 'rambdax'
import insane from 'insane'
import AwIcon from './AwIcon.vue'

export default {
    name: 'AwNoty',

    components: {
        AwIcon: clone(AwIcon)
    },

    props: {
        type: {
            type: String,
            required: true,
            validator(type) {
                return [
                    'bg-info',
                    'bg-warning',
                    'bg-success',
                    'bg-error'
                ].includes(`bg-${type}`)
            }
        },

        title: {
            type: String,
            required: true
        },

        text: {
            type: String,
            default: ''
        },

        icon: {
            type: [String, Boolean],
            default: false
        },

        remove: {
            type: Function,
            default: null
        }
    },

    sanitize: insane
}
</script>
