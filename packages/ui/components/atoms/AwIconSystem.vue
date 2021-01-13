<script>
import { pathOr } from 'rambdax'

const BASE_ATTRS = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 20 20',
    'aria-hidden': true
}

const ICONS = {
    close: 'M19 2l-1-1-8 8-8-8-1 1 8 8-8 8 1 1 8-8 8 8 1-1-8-8 8-8z',
    angle: 'M13 2l-8 8 8 8 1-1-7-7 7-7-1-1z',
    arrow:
        'M7.2 16.7c.2.3.6.3.9 0 .2-.2.2-.7 0-1l-4.2-5h13.7c.3 0 .5-.3.5-.7 0-.4-.2-.7-.5-.7H3.9l4.1-5c.3-.3.3-.8 0-1-.2-.3-.5-.3-.8 0L2.1 9.5a.5.6 0 000 1l5.1 6.2z',
    user:
        'M13.2 11.1c-1 0-1.5.6-3.2.6-1.7 0-2.1-.6-3.2-.6A4.7 4.7 0 002.1 16v1.4c0 1 .8 1.7 1.7 1.7h12.4c1 0 1.7-.8 1.7-1.7v-1.5c0-2.6-2.1-4.7-4.7-4.7zm3.6 6.2c0 .3-.3.6-.6.6H3.8a.6.6 0 01-.5-.6v-1.5c0-2 1.6-3.6 3.5-3.6.7 0 1.4.6 3.2.6 1.8 0 2.5-.6 3.2-.6 2 0 3.6 1.7 3.6 3.7v1.4zM10 10a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm0-7.9A3.4 3.4 0 1110 9 3.4 3.4 0 0110 2z',
    menu: 'M1 11V9h18v2H1zm0-6V3h18v2H1zm0 12v-2h18v2H1z',
    search:
        'M18.8 17.7l-4.3-4.3a7.6 7.6 0 10-1 1l4.2 4.4c.3.3.8.3 1 0 .4-.3.4-.8 0-1zm-10.2-3a6 6 0 110-12.2 6 6 0 010 12.2z',
    eye:
        'M15 5C6 5 .3 14.2.2 14.4a1 1 0 0 0-.2.6 1 1 0 0 0 .2.5S5 25 15 25s14.8-9.3 14.8-9.4a1 1 0 0 0 .2-.6 1 1 0 0 0-.2-.6C29.7 14.2 23.9 5 15 5zm0 3a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 4a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z',
    'eye-no':
        'M15 5C6 5 .3 14.2.2 14.4a1 1 0 0 0-.2.6 1 1 0 0 0 .2.5S5 25 15 25s14.8-9.3 14.8-9.4a1 1 0 0 0 .2-.6 1 1 0 0 0-.2-.6C29.7 14.2 23.9 5 15 5zm0 3a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 4a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z M4 2.6l24 23-1.6 1.8L2 4.6l2-2z',
    more:
        'M1 10a2 2 0 114 0 2 2 0 01-4 0zm7 0a2 2 0 114 0 2 2 0 01-4 0zm7 0a2 2 0 114 0 2 2 0 01-4 0z',
    triangle: 'M5 7h10l-5 5z',
    edit:
        'M13.54 4.65l2.8 2.8a.3.3 0 010 .42l-6.76 6.75-2.87.32a.6.6 0 01-.67-.66l.32-2.87 6.76-6.76a.3.3 0 01.42 0zm5.01-.7l-1.5-1.51a1.2 1.2 0 00-1.71 0l-1.1 1.1a.3.3 0 000 .42l2.8 2.79c.11.12.3.12.42 0l1.1-1.1a1.2 1.2 0 000-1.7zm-5.58 8.84v3.15h-9.9v-9.9h7.1c.1 0 .2-.04.27-.1l1.24-1.25a.37.37 0 00-.26-.63H2.58c-.82 0-1.49.67-1.49 1.49v10.88c0 .82.67 1.49 1.49 1.49h10.88c.82 0 1.49-.67 1.49-1.49v-4.88c0-.33-.4-.5-.64-.26l-1.23 1.23a.38.38 0 00-.11.27z'
}

export default {
    name: 'AwIconSystem',

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

        return d
            ? h(
                  'svg',
                  {
                      attrs: {
                          ...BASE_ATTRS,
                          width: props.size,
                          height: props.size,
                          transform: props.rotate
                              ? `rotate(${props.rotate})`
                              : null,
                          ...data.attrs
                      },
                      class: ['aw-icon', data.staticClass, data.class],
                      style: [data.staticStyle, data.style]
                  },
                  [h('path', { attrs: { d } })]
              )
            : h('span', {}, [props.name])
    }
}
</script>
