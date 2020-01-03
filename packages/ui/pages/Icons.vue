<template>
    <main>
        <div class="flex flex-wrap">
            <div
                class="w-1/2 md:w-1/4 p-4 border text-center"
                v-for="name in iconNames"
                :key="name"
            >
                <code>&lt;AwIcon name="{{ name }}" /&gt;</code> <br />
                <AwIcon :name="name" class="mt-4 mx-auto" size="2xl" />
            </div>
        </div>
    </main>
</template>

<script>
import icons from '~/assets/js/icons'
const iconNames = Object.keys(icons)

export default {
    data() {
        return {
            iconNames
        }
    }
}
</script>
