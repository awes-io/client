<template>
    <div @keydown.enter="focusNext">
        <AwSearch class="mb-8 shadow" />

        <template v-if="!isEmpty">
            <AwTranslationBlock
                v-for="{ id, ...translation } in translations"
                :key="id"
                :id="id"
                v-bind="translation"
            />
        </template>
        <div v-else class="h-50vh flex items-center justify-center h1">
            <template v-if="$route.query.search">Nothing found</template>
            <template v-else>No data</template>
        </div>

        <AwPagination
            v-bind="pagination"
            class="mt-8"
            arrow-nav
            @click:page="setPage"
            @click:limit="setLimit"
        />
    </div>
</template>

<script>
import { pathOr } from 'rambdax'
import { mapGetters } from 'vuex'

export default {
    name: 'LocalizationEdit',

    transition: {
        name: 'fade',
        mode: 'out-in'
    },

    watchQuery: ['page', 'limit', 'search'],

    scrollToTop: true,

    computed: {
        ...mapGetters('awesIoTranslations', [
            'translations',
            'pagination',
            'paginationLimitDefault',
            'isEmpty',
            'isSaving'
        ])
    },

    watch: {
        '$route.query.page': function() {
            if (!this.$isServer) {
                document.body.scrollIntoView({ behavior: 'smooth' })
            }
        }
    },

    methods: {
        focusNext($event) {
            if (!pathOr('', 'target.tagName', $event).toLowerCase() === 'input')
                return

            const target = $event.target
            const fields = Array.from(
                document.querySelectorAll('input, textarea')
            )
            const nextIndex = fields.indexOf(target) + 1

            if (nextIndex !== fields.length) {
                fields[nextIndex].focus()
            }
        },

        setLimit(number) {
            const query = {
                ...this.$route.query
            }

            if (number === this.paginationLimitDefault) {
                delete query.limit
            } else {
                query.limit = number
            }

            this._updateRouter(query)
        },

        setPage(number) {
            const query = {
                ...this.$route.query
            }

            if (number === 1) {
                delete query.page
            } else {
                query.page = number
            }

            this._updateRouter(query)
        },

        _updateRouter(query) {
            if (this.isSaving && !this._unwatcher) {
                this.$store.commit('awesIoTranslations/TOGGLE_LOADER', true)

                this._unwatcher = this.$watch('isSaving', () => {
                    this._unwatcher()

                    delete this._unwatcher

                    this.$store.commit(
                        'awesIoTranslations/TOGGLE_LOADER',
                        false
                    )

                    this.$router.push({
                        ...this.$route,
                        query
                    })
                })
            } else {
                this.$router.push({
                    ...this.$route,
                    query
                })
            }
        }
    },

    async fetch({ store, query }) {
        store.commit('awesIoTranslations/SET_PARAMS_FROM_QUERY', query)
        await store.dispatch('awesIoTranslations/FETCH')
    }
}
</script>
