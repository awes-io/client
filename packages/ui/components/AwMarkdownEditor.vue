<template>
    <div class="bg-surface shadow">
        <!-- mode switcher -->
        <AwTabNav
            :items="switchers"
            :active.sync="activeSwitcher"
            class="px-3"
        />

        <div class="relative">
            <!-- shortcut buttons -->
            <div :style="isEditorVisible" class="flex border-b">
                <AwButton
                    theme="icon"
                    v-for="({ name, ...props }, i) in shortcuts"
                    :key="`${name}-${i}`"
                    v-bind="props"
                    @click="_applyShortcut(name)"
                />
            </div>

            <!-- editor -->
            <textarea
                ref="editor"
                :value="source"
                :style="isEditorVisible"
                class="font-mono min-h-xxs max-h-screen w-full p-3"
                @change="$emit('change', $event.target.value)"
            ></textarea>

            <!-- preview -->
            <div
                v-show="isPreview"
                v-html="html"
                class="absolute inset-0 overflow-auto p-3 content"
            ></div>
        </div>
    </div>
</template>

<script>
import {
    toPairs,
    pathOr,
    startsWith,
    endsWith,
    slice,
    take,
    takeLast
} from 'rambdax'
import autosize from 'autosize'
import marked from 'marked'
import Prism from 'prismjs'
import insane from 'insane'

const MODES = ['editor', 'preview']

const SHORTCUTS = {
    heading: {
        icon: 'font-size',
        token: {
            start: '### '
        }
    },
    bold: {
        icon: 'bold',
        token: {
            start: '**',
            end: '**'
        }
    },
    italic: {
        icon: 'italic',
        token: {
            start: '_',
            end: '_'
        }
    },
    quote: {
        icon: 'quote',
        token: {
            start: '\n\n> '
        }
    }
}

marked.setOptions({
    headerIds: false,
    breaks: true,
    highlight(code, lang = 'markup') {
        try {
            const grammar = pathOr(
                Prism.languages.markup,
                lang,
                Prism.languages
            )
            return Prism.highlight(code, grammar, lang)
        } catch (e) {
            // console.log(e)
            return code
        }
    }
})

insane.defaults.allowedAttributes.th = ['align']
insane.defaults.allowedAttributes.td = ['align']

export default {
    name: 'AwMarkdownEditor',

    model: {
        prop: 'source',
        event: 'change'
    },

    props: {
        source: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            activeSwitcher: 0,
            html: ''
        }
    },

    computed: {
        switchers() {
            return MODES.map(mode => this.$t(`AwMarkdownEditor.${mode}`))
        },

        isPreview() {
            return MODES[this.activeSwitcher] === 'preview'
        },

        isEditorVisible() {
            return { visibility: this.isPreview ? 'hidden' : 'visible' }
        },

        shortcuts() {
            return toPairs(SHORTCUTS).map(([name, { icon }]) => ({
                name,
                icon,
                text: this.$t(`AwMarkdownEditor.${name}`)
            }))
        }
    },

    watch: {
        isPreview(isActive) {
            if (isActive) {
                this.html = this.getHtml()
                this.$emit('change', this.$refs.editor.value)
            }
        }
    },

    mounted() {
        this.$nextTick(() => {
            autosize(this.$refs.editor)
        })
    },

    beforeDestroy() {
        autosize.destroy(this.$refs.editor)
    },

    methods: {
        getHtml() {
            return insane(marked(this.source))
        },

        async _applyShortcut(name) {
            const shortcut = SHORTCUTS[name]
            const editor = this.$refs.editor

            if (!shortcut || !editor) return

            const { start = '', end = '' } = pathOr({}, 'token', shortcut)

            let selStart = editor.selectionStart
            let selEnd = editor.selectionEnd

            let { startChunk, selection, endChunk } = this._getSourceChunks(
                selStart,
                selEnd,
                this.source
            )

            // detect which method to use
            const isApplied = this._isTokenApplied(
                start,
                end,
                startChunk,
                endChunk
            )

            // update strings
            if (isApplied) {
                startChunk = startChunk.substr(
                    0,
                    startChunk.length - start.length
                )
                endChunk = endChunk.substr(end.length)
                selStart -= start.length
                selEnd -= start.length
            } else {
                startChunk = startChunk + start
                endChunk = end + endChunk
                selStart += start.length
                selEnd += start.length
            }

            // apply and wait for DOM changes
            editor.value = startChunk + selection + endChunk
            this.$emit('change', editor.value)
            await this.$nextTick()

            editor.focus()
            editor.setSelectionRange(selStart, selEnd)
        },

        _getSourceChunks(selStart, selEnd, source) {
            return {
                startChunk: take(selStart, source),
                selection: slice(source, selStart, selEnd),
                endChunk: takeLast(source.length - selEnd, source)
            }
        },

        _isTokenApplied(startToken, endToken, startChunk, endChunk) {
            return (
                startToken &&
                endToken &&
                endsWith(startToken, startChunk) &&
                startsWith(endToken, endChunk)
            )
        }
    }
}
</script>
