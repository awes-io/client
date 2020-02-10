<script>
export default {
    name: 'AwContextMenu',

    props: {
        // Popper.js options. List of all options - https://popper.js.org/docs/v2/
        options: {
            type: Object,
            default: () => ({})
        },

        // Additional class for the button that opens list
        buttonClass: {
            type: String,
            default: ''
        }
    },

    render(h) {
        const slotContextList = this.$slots.default
            .filter(el => !!el.tag)
            .map(el => h('li', { class: { 'aw-cm-item': true } }, [el]))

        const renderList = h(
            'ul',
            {
                class: {
                    'list-none': true,
                    'mb-0': true,
                    'aw-context-menu__list': true
                },
                style: {
                    marginBottom: 0
                }
            },
            slotContextList
        )

        const dropdown = h('AwDropdown', {
            ref: 'drop',
            props: {
                'close-on-action': true,
                options: this.options
            },
            class: {
                'w-20': true,
                'aw-context-menu__toggler': true
            },
            scopedSlots: {
                default: () => renderList
            }
        })

        const button = h('AwButton', {
            props: {
                theme: 'icon',
                icon: 'more'
            },
            class: {
                [this.buttonClass]: true
            },
            on: {
                click: this.toggle
            }
        })

        return h('div', { class: { 'aw-context-menu': true } }, [
            button,
            dropdown
        ])
    },

    methods: {
        toggle() {
            this.$refs.drop.toggle()
        }
    }
}
</script>
