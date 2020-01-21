<script>
import AwTableRowToggler from './AwTableRowToggler.vue'

export default {
    name: 'AwTableRow',

    props: {
        row: {},

        rowIndex: {
            required: true
        },

        openedRow: {
            type: Number,
            default: null
        },

        showToggler: Boolean,

        columns: {
            type: Array,
            required: true
        }
    },

    render(h) {
        return h(
            'tr',
            {
                staticClass:
                    'bg-surface hover:bgcolor-muted hover:text-on-muted',
                class: {
                    'border-t': this.rowIndex > 0,
                    'cursor-pointer': this.$listeners['click:row']
                },
                on: this.$listeners['click:row']
                    ? {
                          click: $event => {
                              this.$emit('click:row', {
                                  ...this.$props,
                                  $event
                              })
                          }
                      }
                    : {}
            },
            this.columns
                .map(vNode => {
                    const props = vNode.componentOptions.propsData

                    props.rowData = this.row
                    props.rowIndex = this.rowIndex

                    return vNode
                })
                .concat(
                    h(AwTableRowToggler, {
                        class: { 'border-t': this.rowIndex > 0 },
                        props: {
                            show: this.showToggler,
                            active: this.openedRow === this.rowIndex
                        },
                        on: {
                            click: () => {
                                this.$emit('click:toggle', this.rowIndex)
                            }
                        }
                    })
                )
        )
    }
}
</script>
