<template>
    <div
        v-if="show"
        :style="{
            background: `var(--c-${config.type}, ${defaults.background})`,
            color: `var(--c-on-${config.type}, ${defaults.color})`
        }"
        class="aw-header-notification"
    >
        <!-- conent -->
        <div class="aw-header-notification__content container-fluid">
            <AwIcon v-if="config.icon" :name="config.icon" />
            <span v-html="config.text" class="text-center"></span>
            <AwButton
                v-for="({ listeners, ...props }, i) in config.buttons"
                :key="i"
                size="sm"
                v-bind="props"
                v-on="listeners"
            />
        </div>

        <!-- close -->
        <AwButton
            v-if="config.closable"
            theme="icon"
            class="flex-shrink-0"
            @click="$store.commit('awesIo/SET_HEADER_NOTIFICATION', null)"
        >
            <AwIconSystemMono name="close" />
        </AwButton>
    </div>
</template>

<script>
export default {
    name: 'AwHeaderNotification',

    computed: {
        config() {
            return this.$store.getters['awesIo/headerNotification']
        },

        show() {
            return this.config.text || this.config.buttons.length
        },

        defaults() {
            // $awes._config.default.warning
            return {}
        }
    }
}
</script>
