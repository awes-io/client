<template>
    <AwPage :title="headline" :breadcrumb="breadcrumb">
        <section class="mt-8">
            <h2 class="h3">Infinite or mixed scroll</h2>
            <p>
                You can enable infinite scroll by passing
                <code>infinite-scroll</code> prop to
                <code>AwTableBuilder</code> component
            </p>

            <p>
                Also you can enable both pagination and infinite scroll by
                passing <code>mixed</code> prop to
                <code>AwTableBuilder</code> component.
            </p>

            <AwCard class="border-l-2 border-error my-4">
                If you pass both <code>infinite-scroll</code> and
                <code>mixed</code> props to one
                <code>AwTableBuilder</code> component - only
                <code>mixed</code> will be used
            </AwCard>

            <div class="flex mt-6 mb-3">
                <AwButton
                    :color="isInfinite ? 'success' : 'default'"
                    @click="toggleScroll(true)"
                >
                    Infinite Scroll
                </AwButton>
                <AwButton
                    :color="!isInfinite ? 'success' : 'default'"
                    class="ml-2"
                    @click="toggleScroll(false)"
                >
                    Mixed Scroll
                </AwButton>
            </div>

            <AwTableBuilder :collection="listManagers" v-bind="config">
                <template #list="{ item }">
                    <div class="bg-muted-dark mb-2 p-4 rounded">
                        {{ item.first_name }} {{ item.last_name }}
                    </div>
                </template>
            </AwTableBuilder>

            <AwCodeSnippet v-text="infiniteCode" class="mt-8 shadow" />
        </section>
    </AwPage>
</template>

<script>
import { BaseModel, BaseCollection } from '@awes-io/vue-mc'

class Managers extends BaseCollection {
    model() {
        return BaseModel
    }

    routes() {
        return {
            fetch: 'api/managers'
        }
    }
}

export default {
    name: 'TablePaginationPage',

    data() {
        return {
            title: 'AwTableBuilder',
            headline: this._getTitle('AwTableBuilder'),
            listManagers: new Managers(),
            isInfinite: true,
            breadcrumb: {
                title: 'Table',
                href: '/table/'
            }
        }
    },

    computed: {
        config() {
            return {
                infiniteScroll: this.isInfinite,
                mixed: !this.isInfinite,
                scrollOnPage: false
            }
        },
        infiniteCode() {
            const arr = [
                '<AwTableBuilder :collection="listManagers" :scroll-on-page="false" infinite-scroll>',
                '    <template #list="{ item }">',
                '        <div class="bg-muted-dark mb-2 p-4 rounded">',
                '            {{ item.first_name }} {{ item.last_name }}',
                '        </div>',
                '    </template>',
                '</AwTableBuilder>'
            ]
            return arr.join('\n')
        }
    },

    methods: {
        toggleScroll(isInfinite) {
            // remove query
            this.$router.push({
                ...this.$route,
                query: {}
            })
            this.isInfinite = isInfinite
        }
    },

    head() {
        return {
            title: this._getMetaTitle(this.title),
            meta: [this._getMetaDescription(this.title)]
        }
    }
}
</script>
