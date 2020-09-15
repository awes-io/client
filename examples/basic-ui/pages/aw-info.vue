<template>
    <AwPage :title="headline">
        <AwGrid>
            <AwCard>
                <AwIcon
                    name="question-circle"
                    size="xl"
                    class="mr-2 text-link"
                />
                Documenation and live edit for <code>&lt;AwInfo /&gt;</code> you
                can find by
                <AwLink
                    href="https://docs.awes.io/components/ui/aw-info.html#api"
                    >link.</AwLink
                >
            </AwCard>

            <div>
                <h4 class="h4">Default</h4>
                <AwInfo label="My awesome title">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </AwInfo>
                <AwCodeSnippet v-text="codeDefault" class="mt-2" />
                <hr />
            </div>

            <div>
                <h4 class="h4">With help icon</h4>
                <AwInfo label="My awesome title" help="Tooltip with help infos">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </AwInfo>
                <AwCodeSnippet v-text="codeHelper" class="mt-2" />
                <hr />
            </div>

            <div>
                <h4 class="h4">Custom icon</h4>
                <AwInfo label="My awesome title">
                    <template #icon>
                        <AwIcon
                            v-tooltip:top="'Custom icon'"
                            name="question"
                            size="sm"
                        />
                    </template>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </AwInfo>
                <AwCodeSnippet v-text="codeCustom" class="mt-2" />
            </div>

            <div>
                <h4 class="h4">Default slot empty value</h4>
                <AwSwitcher v-model="isOpen" label="Show text" />

                <AwInfo label="My awesome title">
                    {{ isOpen ? 'Some async text to show later ' : '' }}
                </AwInfo>
            </div>
        </AwGrid>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwInfo',
            headline: this._getTitle('AwInfo'),
            isOpen: false
        }
    },

    computed: {
        codeDefault() {
            const arr = [
                '<AwInfo label="My awesome title">',
                '   Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                '</AwInfo>'
            ]
            return arr.join('\n')
        },
        codeHelper() {
            const arr = [
                '<AwInfo label="My awesome title" help="Tooltip with help infos">',
                '   Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                '</AwInfo>'
            ]
            return arr.join('\n')
        },
        codeCustom() {
            const arr = [
                '<AwInfo label="My awesome title">',
                '    <template #icon>',
                '        <AwIcon',
                '            v-tooltip:top="\'Custom icon\'"',
                '            name="question"',
                '            size="sm"',
                '        />',
                '    </template>',
                '   Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                '</AwInfo>'
            ]
            return arr.join('\n')
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
