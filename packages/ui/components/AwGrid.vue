<script>
import { toPairs, path, pathOr } from 'rambdax'

const isEmptyNode = ({ tag, text = '' }) => {
    return !tag && !text.trim()
}

const getResPrefix = res => {
    return res === 'default' ? '' : `${res}:`
}

const getWidthFraction = (col, span = 1) => {
    return span === col ? 'w-full' : `w-${span}/${col}`
}

// col = { default: 1, md: 4, lg: 4 } Must specify `lg`!!!
// span = { lg: 2 }
const makeWidthClass = (col, span = 1) => {
    if (typeof col === 'number') {
        return `${getWidthFraction(col, span)}`
    } else if (col) {
        return toPairs({ default: 1, ...col }).reduce((acc, [res, col]) => {
            const _span = typeof span === 'object' ? pathOr(1, res, span) : span
            return `${acc} ${getResPrefix(res)}${getWidthFraction(col, _span)}`
        }, '')
    }
    return ''
}

const makeColClass = (widthClass, gap) =>
    `block ${widthClass} pt-${gap} pl-${gap}`

export default {
    name: 'AwGrid',

    functional: true,

    props: {
        col: {
            type: [Number, Object],
            default: 1
        },

        gap: {
            type: [Number],
            default: 4
        }
    },

    render(h, { props, children = [], data }) {
        const { col, gap } = props

        const colClass = makeColClass(makeWidthClass(col), gap)

        return h('div', { staticClass: data.staticClass, class: data.calss }, [
            h(
                'div',
                { staticClass: `flex flex-wrap -ml-${gap} -mt-${gap}` },
                children.reduce((acc, child) => {
                    if (isEmptyNode(child)) return acc

                    let span = path('data.attrs.span', child)

                    if (span) {
                        span = isNaN(parseInt(span))
                            ? new Object(span)
                            : Number(span)

                        // `span` DOM prop is applied, so no need to remove it
                        delete child.data.attrs.span
                    }

                    return acc.concat(
                        h(
                            'div',
                            {
                                staticClass: span
                                    ? makeColClass(
                                          makeWidthClass(col, span),
                                          gap
                                      )
                                    : colClass
                            },
                            [child]
                        )
                    )
                }, [])
            )
        ])
    }
}
</script>
