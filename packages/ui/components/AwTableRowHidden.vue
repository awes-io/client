<template functional>
    <tr>
        <td class="p-2 align-top">
            <strong v-if="props.title">{{ props.title }}:</strong>
        </td>
        <td class="p-2">
            <slot v-bind="props">{{ props.cell }}</slot>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'AwTableRowHidden',

    props: {
        title: String,

        cell: {},

        index: Number
    }
}
</script>
