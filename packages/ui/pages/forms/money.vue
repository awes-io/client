<template>
    <div>
        <AwInput
            v-model.number="price"
            label="Non formatted"
            :pattern="/\d+/g"
        />

        <AwMoney
            v-model="price"
            :options="{
                currency: 'USD'
            }"
            size="sm"
            class="mt-4"
        >
            <template #prefix>
                <span class="px-2">Money:</span>
            </template>
            <template #element>
                nothing rendered
            </template>
            <template #postfix>
                <span class="px-2">dollars</span>
            </template>
        </AwMoney>
    </div>
</template>

<script>
export default {
    name: 'FormsMoney',

    data() {
        return {
            price: -20
        }
    }
}
</script>
