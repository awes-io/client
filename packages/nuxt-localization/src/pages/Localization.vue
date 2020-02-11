<template>
    <div class="flex flex-col min-h-screen">
        <div class="container mt-8 mb-4">
            <AwSearch />
            <h1 class="h1">Localization helper</h1>
        </div>

        <!-- nav -->
        <AwTranslationNav class="bg-muted-dark" />

        <!-- content -->
        <div class="relative py-8 bg-muted-dark flex-grow">
            <NuxtChild class="container" />

            <!-- loading overlay -->
            <Transition name="fade">
                <div
                    v-show="isLoading"
                    class="absolute inset-0 bg-surface opacity-50"
                ></div>
            </Transition>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Localization',

    layout: 'empty',

    computed: {
        ...mapGetters('awesIoTranslations', ['isLoading'])
    }
}
</script>
