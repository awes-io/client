<script>
import { pathOr } from 'rambdax'
import ICONS from '@AwUtils/icons/mono'

const BASE_ATTRS = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 20 20',
    'aria-hidden': true,
    'clip-rule': 'evenodd',
    'fill-rule': 'evenodd'
}

export default {
    name: 'AwIconSystemMono',

    functional: true,

    props: {
        name: {
            type: String,
            required: true
        },

        size: {
            type: [String, Number],
            default: 20
        },

        rotate: {
            type: [String, Number],
            default: null
        }
    },

    render(h, { data, props }) {
        const d = pathOr('', props.name, ICONS)
        const transform = props.rotate ? `rotate(${props.rotate}deg)` : null

        return d
            ? h(
                  'svg',
                  {
                      attrs: {
                          ...BASE_ATTRS,
                          width: props.size,
                          height: props.size,
                          ...data.attrs
                      },
                      class: ['aw-icon', data.staticClass, data.class],
                      style: [data.staticStyle, data.style, { transform }]
                  },
                  [h('path', { attrs: { d } })]
              )
            : h('span', {}, [props.name])
    }
}
</script>
