<template>
    <AwPage title="Grids">
        <!-- config panel -->
        <div class="bg-surface border rounded p-4 mb-4">
            <AwSwitcher v-model="responsive" label="Responsive" />
            <Transition name="fade" mode="out-in">
                <AwInput
                    v-if="!responsive"
                    v-model.number="col"
                    label="Columns"
                    class="mt-4"
                />
                <AwGrid v-else :col="{ md: 2, lg: 4 }" class="mt-4">
                    <AwInput
                        v-for="(_col, res) in resCol"
                        :key="res"
                        v-model.number="resCol[res]"
                        :label="`Columns ${res}`"
                    />
                </AwGrid>
            </Transition>
            <AwGrid :col="{ md: 2 }" class="mt-4">
                <AwInput v-model.number="gap" label="Gap" />
                <AwInput v-model.number="items" label="Number of items" />
            </AwGrid>
        </div>

        <!-- code snippet -->
        <h2 class="h3">Code</h2>
        <AwGrid :col="{ lg: 2 }">
            <AwCodeSnippet v-text="code" />
            <blockquote class="border border-error rounded p-4">
                Note! that you must specify
                <code class="code">col</code> implicitly for each
                <code class="code">span</code> value, in order to use the span
                propery
            </blockquote>
        </AwGrid>

        <!-- visual example -->
        <h2 class="h3">Example</h2>
        <AwGrid :col="colProp" :gap="gap">
            <div :span="colProp" :class="`bg-${getColor(0)} p-4`">
                Always full width
            </div>
            <div
                v-for="item in items"
                :key="item"
                :class="`bg-${getColor(item)} p-4`"
            >
                Column {{ item }}
            </div>
            <AwGrid :col="2">
                <div class="border p-2">Nested</div>
                <div class="border p-2">Grid</div>
                <div class="border p-2">Example</div>
            </AwGrid>
        </AwGrid>
    </AwPage>
</template>

<script>
import { filter, isFalsy } from 'rambdax'

const colors = ['surface', 'brand', 'success', 'warning', 'error']
const colorsLength = colors.length

export default {
    name: 'GridPage',

    head() {
        return {
            title: 'AwGrid'
        }
    },

    data() {
        return {
            responsive: false,
            col: 3,
            resCol: {
                default: 1,
                md: null,
                lg: null,
                xl: null
            },
            gap: 4,
            items: 6
        }
    },

    computed: {
        colProp() {
            return this.responsive
                ? filter(val => !isFalsy(val), this.resCol)
                : this.col
        },

        code() {
            const col =
                typeof this.colProp === 'object'
                    ? { ...this.colProp }
                    : this.colProp

            if (col.default === 1) {
                delete col.default
            }

            const _colProp = JSON.stringify(col).replace(/"/g, '')

            return `<AwGrid :col="${_colProp}" :gap="${this.gap}">
    <div :span="${_colProp}">
        Always full width
    </div>
    <div>Item 1</div>
    <div>Item 2</div>
</AwGrid>`
        }
    },

    methods: {
        getColor(index) {
            return colors[index % colorsLength]
        }
    }
}
</script>
