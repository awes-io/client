<script>
import { path } from 'rambdax'

// const isEmptyNode = ({ tag, text = '' }) => {
//     return !tag && !text.trim()
// }

const makeClass = (base, option, defaultValue) => {
    if (typeof option === 'object' && option !== null) {
        let classes = base + '-' + (option.default || defaultValue)

        for (const key in option) {
            if (key === 'default') continue
            classes = classes.concat(' ' + key + ':' + base + '-' + option[key])
        }

        return classes
    } else if (option) {
        return base + '-' + option
    } else {
        return base + '-' + defaultValue
    }
}

export default {
    name: 'AwGrid',

    functional: true,

    props: {
        col: {
            type: [Number, Object],
            default: 1
        },

        gap: {
            type: [Number, Object],
            default: 4
        }
    },

    render(h, { props, children = [], data }) {
        return h(
            'div',
            {
                staticClass: data.staticClass,
                class: [
                    data.class,
                    'grid',
                    makeClass('grid-cols', props.col, 1),
                    makeClass('gap', props.gap, 4)
                ]
            },
            children.map((child) => {
                const span = path('data.attrs.span', child)

                if (span) {
                    delete child.data.attrs.span

                    const cls = child.data.staticClass || ''

                    child.data.staticClass =
                        cls + (cls ? ' ' : '') + makeClass('col-span', span, 1)
                }

                return child
            })
        )
    }
}
</script>
