<template>
    <div class="bg-muted p-4 lg:p-6 shadow-lg mt-4 lg:mt-6">
        <div class="h3 font-mono flex items-center">
            {{ name }} {{ isSaving }}
            <div class="ml-auto flex items-center">
                <AwButton
                    v-show="showConfirm"
                    text="Confirm"
                    theme="outline"
                    size="sm"
                    color="error"
                    class="mr-2"
                    @click="remove"
                />
                <AwButton
                    tabindex="-1"
                    text="Remove"
                    size="sm"
                    color="error"
                    @click="showConfirm = true"
                />
            </div>
        </div>

        <Component
            :is="isLongText ? 'AwTextarea' : 'AwInput'"
            v-for="locale in locales"
            :key="locale"
            :value="value[locale]"
            :label="locale"
            class="mt-2"
            @change="update($event, locale)"
        />
    </div>
</template>

<script>
import { prop, values, isType, equals } from 'rambdax'

export default {
    name: 'AwTranslationBlock',

    props: {
        id: {
            type: Number,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        value: {
            type: Object,
            default: () => ({}),
            validator(obj) {
                return values(obj).every(isType('String'))
            }
        }
    },

    data() {
        return {
            showConfirm: false,
            currentValue: { ...this.value }
        }
    },

    computed: {
        locales() {
            return this.$i18n.locales.map(prop('code'))
        },

        isSaving() {
            return this.$store.state.awesIoTranslations.isSaving
        },

        isLongText() {
            return values(this.value).some(
                translation => translation.length > this._config.textLimit
            )
        }
    },

    watch: {
        showConfirm(isVisible) {
            if (isVisible) {
                this._tm = setTimeout(() => {
                    this.showConfirm = false
                    delete this._tm
                }, 2000)
            }
        },

        currentValue(value) {
            if (this.isSaving) {
                this.$nuxt.$loading.finish()
            }

            if (!equals(this.value, value)) {
                this.$store.dispatch('awesIoTranslations/UPDATE', {
                    id: this.id,
                    name: this.name,
                    value
                })
            } else if (this.isSaving) {
                this.$store.commit('awesIoTranslations/TOGGLE_SAVING', false)
            }
        }
    },

    beforeDestroy() {
        if (this._tm) clearTimeout(this._tm)
    },

    methods: {
        update(text = '', locale) {
            this.currentValue = {
                ...this.currentValue,
                [locale]: text.trim()
            }
        },

        remove() {
            this.$store.dispatch('awesIoTranslations/REMOVE', this.id)
        }
    }
}
</script>
