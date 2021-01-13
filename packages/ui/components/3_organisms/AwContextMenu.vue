<script>
import arrowFocusMixin from '@AwMixins/arrow-focus'

export default {
    name: 'AwContextMenu',

    mixins: [arrowFocusMixin],

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
            .filter((el) => !!el.tag)
            .map((el) => {
                return h(
                    'li',
                    {
                        staticClass: 'aw-cm-item'
                    },
                    [
                        {
                            ...el,
                            data: {
                                ...el.data,
                                attrs: {
                                    ...el.data.attrs,
                                    'data-arrow-focus': ''
                                }
                            }
                        }
                    ]
                )
            })

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
                show: this.isOpened,
                options: this.options
            },
            class: {
                'aw-context-menu__toggler': true
            },
            scopedSlots: {
                default: () => renderList
            },
            on: {
                'update:show': (val) => (this.isOpened = val)
            }
        })

        const button = h(
            'AwButton',
            {
                props: {
                    theme: 'icon'
                },
                staticClass: this.buttonClass,
                attrs: {
                    'data-arrow-focus': ''
                },
                on: {
                    click: this.toggle
                }
            },
            [h('AwIconSystem', { props: { name: 'more' } })]
        )

        return h(
            'div',
            { staticClass: 'aw-context-menu', on: { keydown: this.onKeydown } },
            [button, dropdown]
        )
    },

    data() {
        return {
            isOpened: false
        }
    },

    methods: {
        toggle() {
            this.isOpened = !this.isOpened
        },

        onKeydown($event) {
            if ($event.key === 'ArrowDown') {
                $event.stopPropagation()
                this._arrowFocusItem(+1, $event)
            }
            if ($event.key === 'ArrowUp') {
                $event.stopPropagation()
                this._arrowFocusItem(-1, $event)
            }
        }
    }
}
</script>
