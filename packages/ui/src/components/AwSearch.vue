<template>
    <AwInput
        ref="input"
        size="sm"
        v-bind="$attrs"
        v-model="text"
        autocomplete="off"
        :placeholder="$t('AwSearch.text')"
    >
        <template #icon>
            <AwIcon
                v-if="!$route.query[param]"
                name="search"
                class="h-full w-10 p-3"
            />
            <button v-else @click="clear">
                <AwIcon name="close" class="h-full w-10 p-3" />
            </button>
        </template>
    </AwInput>
</template>

<script>
import { mergeRouteQuery } from '~/assets/js/router'

export default {
    name: 'AwSearch',

    data() {
        return {
            text: ''
        }
    },

    props: {
        param: {
            type: String,
            default: 'search'
        },

        debounce: {
            type: Number,
            default: 400
        }
    },

    watch: {
        text: function(newValue) {
            newValue = newValue.trim()

            const currentValue = this.$route.query[this.param] || ''

            if (newValue === currentValue) return

            clearTimeout(this._tm)

            this._tm = setTimeout(this.setSearchParam, this.debounce, newValue)
        },

        '$route.query': {
            deep: true,
            immediate: true,
            handler(query) {
                clearTimeout(this._tm)
                this.text = query[this.param] || ''
            }
        }
    },

    beforeDestroy() {
        clearTimeout(this._tm)
    },

    methods: {
        setSearchParam(text) {
            this.$router
                .replace(mergeRouteQuery({ [this.param]: text }, this.$route))
                .catch(e => {
                    console.log(e)
                })
        },

        clear() {
            this.setSearchParam('')
            this.$refs.input.focus()
        }
    }
}
</script>
