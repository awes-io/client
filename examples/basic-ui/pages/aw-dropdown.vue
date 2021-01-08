<template>
    <AwPage :title="headline">
        <h3>Button</h3>

        <AwButton @click="$refs.drop.toggle()">
            Toggle dropdown
        </AwButton>
        <AwDropdown ref="drop">
            <AwDropdownButton text="with icon">
                <template #icon>
                    <AwIcon name="duotone/check-circle" size="12" />
                </template>
            </AwDropdownButton>
            <AwDropdownButton color="success">
                Success
            </AwDropdownButton>
            <AwDropdownButton color="warning">
                Warning
            </AwDropdownButton>
            <AwDropdownButton color="error">
                Danger
            </AwDropdownButton>
            <AwDropdownButton active>
                Default active
            </AwDropdownButton>
            <AwDropdownButton color="success" active>
                Success active
            </AwDropdownButton>
            <AwDropdownButton color="warning" active>
                Warning active
            </AwDropdownButton>
            <AwDropdownButton color="error" active>
                Danger active
            </AwDropdownButton>
        </AwDropdown>

        <AwButton @click="$refs.drop1.toggle()">
            New button
        </AwButton>
        <AwDropdown ref="drop1">
            <AwDropdownButton>Text long 1</AwDropdownButton>
            <AwDropdownButton>Text long 2</AwDropdownButton>
            <AwDropdownButton>Text long 3</AwDropdownButton>
            <AwDropdownButton>Text long 4</AwDropdownButton>
            <AwDropdownButton>Text long 5</AwDropdownButton>
            <AwDropdownButton>Text long 6</AwDropdownButton>
            <hr />
            <AwDropdownButton color="error">Remove</AwDropdownButton>
        </AwDropdown>

        <AwCodeSnippet v-text="code" class="mt-3 shadow" :size="50" />
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwDropdown',
            headline: this._getTitle('AwDropdown')
        }
    },

    computed: {
        code() {
            const arr = [
                '<AwButton @click="$refs.drop1.toggle()">',
                '    New button',
                '</AwButton>',
                '<AwDropdown ref="drop1">',
                '    <AwDropdownButton>Text long 1</AwDropdownButton>',
                '    <AwDropdownButton>Text long 2</AwDropdownButton>',
                '    <AwDropdownButton>Text long 3</AwDropdownButton>',
                '    <AwDropdownButton>Text long 4</AwDropdownButton>',
                '    <AwDropdownButton>Text long 5</AwDropdownButton>',
                '    <AwDropdownButton>Text long 6</AwDropdownButton>',
                '    <hr />',
                '    <AwDropdownButton color="error">Remove</AwDropdownButton>',
                '</AwDropdown>'
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
