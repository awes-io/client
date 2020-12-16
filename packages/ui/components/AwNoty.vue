<template functional>
    <div
        :class="{
            'bg-overlay': props.icon,
            [`bg-${props.type}`]: !props.icon,
            'aw-noty__has-text': props.text
        }"
        class="aw-noty"
    >
        <!-- icon -->
        <Component
            :is="$options.components.AwIcon"
            v-if="typeof props.icon === 'string' && props.icon"
            :name="props.icon"
            class="aw-noty__icon"
            :class="`text-${props.type}`"
        />

        <!-- content -->
        <div class="aw-noty__content" :class="{ 'has-text': props.text }">
            <div class="aw-noty__title">{{ props.title }}</div>
            <div
                v-if="props.text"
                v-html="$options.sanitize(props.text)"
                class="aw-noty__text"
            ></div>
        </div>

        <!-- close button -->
        <button
            v-if="props.remove && props.closable !== false"
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
                return ['info', 'warning', 'success', 'error'].includes(type)
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
        },

        closable: {
            type: Boolean,
            default: false
        }
    },

    sanitize: insane
}
</script>
