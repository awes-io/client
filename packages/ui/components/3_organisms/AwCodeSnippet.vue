<script>
import copyFn from 'clipboard-copy'
import Prism from 'prismjs'
import { pathOr } from 'rambdax'

export default {
    name: 'AwCodeSnippet',

    functional: true,

    props: {
        language: {
            type: String,
            default: 'markup'
        }
    },

    render(h, { data, children, props, parent }) {
        const codeText = pathOr(
            pathOr('', 'domProps.textContent', data),
            '0.text',
            children
        )
        let innerHTML = ''

        try {
            innerHTML = Prism.highlight(
                codeText,
                Prism.languages[props.language],
                props.language
            )
        } catch (e) {
            console.log(e)
        }

        return h(
            'div',
            { staticClass: `${data.staticClass} overflow-auto relative` },
            [
                h(
                    'AwButton',
                    {
                        staticClass: 'absolute top-0 right-0 mr-4 mt-4',
                        props: {
                            theme: 'outline',
                            size: 'sm',
                            color: 'surface'
                        },
                        on: {
                            click: () => copyFn(codeText)
                        }
                    },
                    [parent.$t('AwCodeSnippet.copy')]
                ),
                h(
                    'pre',
                    {
                        staticClass: `pre min-h-xxs language-${props.language}`
                    },
                    [
                        h('code', {
                            staticClass: `language-${props.language}`,
                            domProps: { innerHTML }
                        })
                    ]
                )
            ]
        )
    }
}
</script>
