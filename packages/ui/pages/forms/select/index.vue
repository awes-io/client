<template>
    <div>
        <AwSelect
            :options="options"
            :disabled="disabled"
            label="Select something"
            v-model="selected"
        />

        <p class="h4">Disable</p>
        <AwSwitcher label="Disabled" v-model="disabled" />

        <p class="h4">Radio list with same model</p>
        <AwRadio
            v-for="option in options"
            :key="option"
            :label="option"
            :value="option"
            v-model="selected"
        />

        <AwSelect
            :options="options"
            :disabled="disabled"
            label="Select something"
            v-model="selected"
        />
    </div>
</template>

<script>
export default {
    name: 'SelectTextPage',

    head() {
        return {
            title: 'AwSelect'
        }
    },

    data() {
        return {
            disabled: false,
            options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven'],
            selected: 'three'
        }
    }
}
</script>
