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
        <svg
            v-else-if="props.icon"
            width="20"
            height="20"
            :class="`text-${props.type}`"
            class="aw-noty__icon fill-current"
        >
            <path
                d="M10 1.8a8.2 8.2 0 100 16.4 8.2 8.2 0 000-16.4zm4.1 6.5l-4.4 4.4a.7.7 0 01-1 0l-2.2-2.2a.7.7 0 111-1l1.7 1.8 4-4a.7.7 0 111 1zm0 0"
            />
        </svg>

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
            <Component
                :is="$options.components.AwIconSystem"
                name="close"
                size="14"
            />
        </button>
    </div>
</template>

<script>
import insane from 'insane'
import AwIcon from '@AwAtoms/AwIcon.vue'
import AwIconSystem from '@AwAtoms/AwIconSystem.vue'

export default {
    name: 'AwNoty',

    components: {
        AwIcon,
        AwIconSystem
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
