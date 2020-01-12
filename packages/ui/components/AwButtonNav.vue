<template>
    <div class="inline-flex relative">
        <div
            class="bg-overlay rounded-sm opacity-10 absolute inset-0 m-1"
            aria-hidden="true"
        ></div>
        <div
            class="bg-surface shadow rounded-sm absolute top-0 bottom-0"
            style="transition: 250ms left, 100ms width;"
            :style="markerStyle"
            aria-hidden="true"
        ></div>
        <template v-for="({ text, href }, i) in mergedItems">
            <RouterLink
                v-if="href"
                :key="`${text}-${i}`"
                class="px-4 py-2 text-sm relative focus:outline-none"
                :class="
                    i === active
                        ? 'opacity-100 js-active'
                        : 'opacity-50 hover:opacity-100'
                "
                :to="href"
                exact
            >
                {{ text }}
            </RouterLink>
            <span
                v-else
                :key="`spacer-${i}`"
                class="px-4 py-2 text-sm opacity-50"
            >
                {{ text }}
            </span>
        </template>
    </div>
</template>

<script>
import subnavMixin from '../mixins/subnav'

export default {
    name: 'AwButtonNav',

    mixins: [subnavMixin]
}
</script>
