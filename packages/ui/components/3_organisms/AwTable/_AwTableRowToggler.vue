<template functional>
    <td
        v-show="props.show"
        class="w-12 px-5 border-l cursor-pointer outline-none text-center align-middle"
        :class="{ 'bg-mono-800': props.active, 'border-t': props.index > 0 }"
        role="button"
        :tabindex="props.show ? 0 : -1"
        v-bind="$options.dataAttrs(props)"
    >
        <Component
            :is="$options.components.AwIconSystemMono"
            name="angle"
            size="10"
            rotate="270"
            class="transition-200"
            :class="{ 'rotate-180': props.active }"
        />
    </td>
</template>

<script>
import { TABLE_PRIORITY_ATTR, TABLE_TOGGLER_ATTR } from '@AwUtils/constants'
import AwIconSystemMono from '@AwAtoms/AwIcon/AwIconSystemMono.vue'

export default {
    name: 'AwTableRowToggler',

    components: {
        AwIconSystemMono
    },

    props: {
        show: Boolean,

        active: Boolean,

        index: {
            type: Number,
            required: true
        }
    },

    dataAttrs(props) {
        return {
            [TABLE_PRIORITY_ATTR]: '-Infinity',
            [TABLE_TOGGLER_ATTR]: props.index
        }
    }
}
</script>
