<template functional>
    <span
        :style="[data.staticStyle, data.style]"
        :class="[data.staticClass, data.class]"
        class="flex items-center"
    >
        <AwAvatar
            :size="props.withName ? 19 : 36"
            :src="props.src"
            :name="props.name"
        />
        <div v-if="props.withName" class="ml-2">
            <span>{{ props.name }}</span>
        </div>
    </span>
</template>

<script>
import AwAvatar from './AwAvatar.vue'

export default {
    name: 'AwAvatar',

    components: {
        AwAvatar
    },

    props: {
        src: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        withName: {
            type: Boolean
        }
    }
}
</script>
