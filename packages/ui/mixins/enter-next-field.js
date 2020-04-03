import { FORM_ENTER_SKIP_ATTR } from '../assets/js/constants'
import { path } from 'rambdax'

const FIELDS = [
    { tag: 'input', exclude: ['[type="hidden"]'] },
    { tag: 'select' },
    { tag: 'textarea' }
]

const GLOBAL_EXCLUDE = [`[${FORM_ENTER_SKIP_ATTR}]`, '[disabled]']

const TAG_NAMES = FIELDS.map(({ tag }) => tag.toUpperCase())

const FIELDS_SELECTOR = FIELDS.map(({ tag, exclude = [] }) => {
    const excludeRule = GLOBAL_EXCLUDE.concat(exclude)
        .map(rule => `:not(${rule})`)
        .join('')
    return `${tag}${excludeRule}`
}).join(', ')

export default {
    methods: {
        _onEnterKeydown(e) {
            const target = path('target', e)
            const targetTag = path('target.tagName', e)
            const keyCode = path('keyCode', e)
            const tagIndex = TAG_NAMES.indexOf(targetTag)

            if (keyCode !== 13 || tagIndex === -1) return

            if (FIELDS[tagIndex].tag === 'textarea') {
                e.stopPropagation()
                return
            }

            const elements = Array.from(
                this.$el.querySelectorAll(FIELDS_SELECTOR)
            )

            const index = elements.indexOf(target)

            if (index < 0) return

            e.preventDefault()

            if (
                index === elements.length - 1 ||
                e.ctrlKey ||
                e.shiftKey ||
                e.metaKey
            ) {
                this._onEnterKeydownAction()
            } else {
                elements[index + 1].focus()
            }
        },

        _onEnterKeydownAction() {
            /* overwrite this function in the component */
        }
    }
}
