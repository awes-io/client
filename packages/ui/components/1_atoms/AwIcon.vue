<script>
export default {
    name: 'AwIcon',

    functional: true,

    props: {
        name: {
            type: String,
            required: true
        },

        viewBox: {
            type: String,
            default: null
        },

        size: {
            type: [String, Number],
            default: 18
        }
    },

    render(h, { props: { name, size, viewBox }, data }) {
        return h('SvgIcon', {
            props: { name, viewBox },
            staticClass: 'aw-icon',
            class: [data.class, data.staticClass],
            style: [data.style, data.staticStyle],
            attrs: {
                'aria-hidden': true,
                width: size || null,
                height: size || null,
                ...data.attrs
            }
        })
    }
}
</script>
