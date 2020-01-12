<template functional>
    <td
        v-show="props.show"
        class="w-12 px-5 border-l cursor-pointer text-center align-middle"
        :class="{ 'bg-muted': props.active }"
        data-priority="-Infinity"
        role="button"
        tabindex="0"
        @click.stop="listeners.click"
    >
        <AwIcon
            name="chevron-d"
            size="xxs"
            class="transition-200"
            :class="{ 'rotate-180': props.active }"
        />
    </td>
</template>

<script>
export default {
    name: 'AwTableRowToggler',

    props: {
        show: Boolean,

        active: Boolean
    }
}
</script>
