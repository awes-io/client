<template>
    <div>
        <Transition name="fade" mode="out-in">
            <RouterView name="subnav" />
        </Transition>
    </div>
</template>

<script>
export default {
    name: 'SelectPage'
}
</script>
