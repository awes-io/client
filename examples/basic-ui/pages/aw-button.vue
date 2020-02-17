<template>
    <AwPage :title="headline">
        <h5>Default button:</h5>

        <AwButton>Button</AwButton>
        <AwButton href="/aw-dropdown">Route</AwButton>
        <AwButton href="//google.com">Google link</AwButton>
        <AwButton icon="intelligence">With icon</AwButton>

        <AwCodeSnippet v-text="codeDefault" class="my-3" />

        <h5>Sizes:</h5>
        <AwButton v-for="size in sizes" :size="size" :key="size" class="m-1">
            {{ size }}
        </AwButton>

        <AwCodeSnippet v-text="generateCode('size', sizes)" class="my-3" />

        <h6>Colors:</h6>

        <AwButton
            v-for="color in colors"
            :color="color"
            :key="color"
            class="m-1"
        >
            {{ color || 'default' }}
        </AwButton>

        <AwCodeSnippet v-text="generateCode('color', colors)" class="my-3" />

        <h6>Outline theme:</h6>

        <AwButton
            v-for="color in colors"
            theme="outline"
            :color="color"
            :key="`outline-${color}`"
            class="m-1"
        >
            {{ color || 'default' }}
        </AwButton>

        <AwCodeSnippet
            v-text="generateCode('color', colors, outlineText)"
            class="my-3"
        />

        <h6>Ghost theme:</h6>

        <AwButton
            v-for="color in colors"
            theme="ghost"
            :color="color"
            :key="`ghost-${color}`"
            class="m-1"
        >
            {{ color || 'default' }}
        </AwButton>

        <AwCodeSnippet
            v-text="generateCode('color', colors, ghostText)"
            class="my-3"
        />

        <h3>Button states</h3>

        <h6>Disabled</h6>

        <AwSwitcher v-model="isDisabled" label="Toggle disabled state" />

        <AwButton
            :disabled="isDisabled"
            color="info"
            class="m-1"
            @click="alert('Button')"
        >
            Button
        </AwButton>

        <AwButton
            :disabled="isDisabled"
            color="success"
            theme="outline"
            class="m-1"
            @click="alert('Outline')"
        >
            Outline
        </AwButton>

        <AwButton
            :disabled="isDisabled"
            color="error"
            theme="ghost"
            class="m-1"
            @click="alert('Ghost')"
        >
            Ghost
        </AwButton>

        <AwButton
            :disabled="isDisabled"
            icon="intelligence"
            color="info"
            @click="alert('With icon')"
        >
            With icon
        </AwButton>

        <AwCodeSnippet v-text="generateStateCode('disabled')" class="my-3" />

        <h6>Loading</h6>

        <AwSwitcher v-model="isLoading" label="Toggle loading state" />

        <AwButton
            :loading="isLoading"
            color="info"
            class="m-1"
            @click="alert('Button')"
        >
            Button
        </AwButton>

        <AwButton
            :loading="isLoading"
            color="success"
            theme="outline"
            class="m-1"
            @click="alert('Outline')"
        >
            Outline
        </AwButton>

        <AwButton
            :loading="isLoading"
            color="error"
            theme="ghost"
            class="m-1"
            @click="alert('Ghost')"
        >
            Ghost
        </AwButton>

        <AwButton
            :loading="isLoading"
            icon="intelligence"
            color="info"
            @click="alert('With icon')"
        >
            With icon
        </AwButton>

        <AwCodeSnippet v-text="generateStateCode('loading')" class="my-3" />

        <h3 class="mt-8 mb-4">Button groups</h3>

        <div class="aw-button-group">
            <AwButton
                v-for="color in colors"
                :color="color"
                :key="color"
                class="m-1"
            >
                {{ color || 'default' }}
            </AwButton>
        </div>
        <div class="aw-button-group mt-4">
            <AwButton
                v-for="color in colors"
                :color="color"
                :key="color"
                theme="outline"
            >
                {{ color || 'default' }}
            </AwButton>
        </div>
        <div class="aw-button-group mt-4">
            <AwButton
                v-for="i in 6"
                color="gray"
                :key="i"
                theme="outline"
                size="sm"
            >
                button {{ i }}
            </AwButton>
        </div>

        <AwCodeSnippet v-text="codeGroup" class="my-3" />
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwButton',
            headline: this._getTitle('AwButton'),
            sizes: ['xs', 'sm', 'md', 'lg'],
            colors: ['', 'info', 'success', 'warning', 'error'],
            isLoading: true,
            isDisabled: true,
            outlineText: 'theme="outline"',
            ghostText: 'theme="ghost"'
        }
    },

    computed: {
        codeDefault() {
            const arr = [
                '<AwButton>Button</AwButton>',
                '<AwButton href="/aw-dropdown">Route</AwButton>',
                '<AwButton href="//google.com" disabled>Google link</AwButton>',
                '<AwButton icon="intelligence" color="info">With icon</AwButton>'
            ]
            return arr.join('\n')
        },

        codeGroup() {
            const arr = [
                '<div class="aw-button-group">',
                this.generateCode('color', this.colors, false, true),
                '</div>',
                '\n<div class="aw-button-group">',
                this.generateCode('color', this.colors, this.outlineText, true),
                '</div>'
            ]
            return arr.join('\n')
        }
    },

    methods: {
        alert(text) {
            alert(text)
        },

        generateCode(attrName = '', attrVals = [], prop = '', tab = false) {
            const propText = prop ? ` ${prop}` : ''
            const tabText = tab ? '    ' : ''

            const base = attrVals.map(
                val =>
                    `${tabText}<AwButton${propText} ${attrName}="${val}">Button</AwButton>`
            )
            return base.join('\n')
        },

        generateStateCode(state = '') {
            const arr = [
                `<AwButton ${state} color="info">Button</AwButton>`,
                `<AwButton ${state} disabled color="success" theme="outline">Outline</AwButton>`,
                `<AwButton ${state} disabled color="error" theme="ghost">Ghost</AwButton>`,
                `<AwButton ${state} icon="intelligence" color="info">With icon</AwButton>`
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
