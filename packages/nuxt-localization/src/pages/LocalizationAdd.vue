<template>
    <AwForm
        :class="{ 'is-loading': isLoading }"
        @submit.prevent="addTranslation"
    >
        <AwInput v-model="name" :error="errors.name" label="Name" ref="name" />
        <AwInput
            v-for="locale in locales"
            :key="locale"
            v-model="value[locale]"
            :error="errors[`value.${locale}`]"
            :label="locale"
            class="mt-2"
        />
        <AwButton type="submit" text="Add" class="mt-4" />
    </AwForm>
</template>

<script>
import { prop } from 'rambdax'
import { mapGetters } from 'vuex'

export default {
    name: 'LocalizationAdd',

    transition: {
        name: 'fade',
        mode: 'out-in'
    },

    data() {
        return {
            name: '',
            value: {},
            errors: {}
        }
    },

    computed: {
        ...mapGetters('awesIoTranslations', ['isLoading']),

        locales() {
            return this.$i18n.locales.map(prop('code'))
        }
    },

    async mounted() {
        await this.$nextTick()
        this.$refs.name.focus()
    },

    methods: {
        addTranslation() {
            const { name, value } = this

            this.errors = {}

            if (!name) {
                this.$set(this.errors, 'name', 'Name is required')
                return
            }

            this.$store
                .dispatch('awesIoTranslations/ADD', { name, value })
                .then(() => {
                    this.name = ''
                    this.value = {}
                })
                .catch(e => {
                    this.errors = e
                })
        }
    }
}
</script>
