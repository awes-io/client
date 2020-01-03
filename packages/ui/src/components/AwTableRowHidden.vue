<script>
export default {
    name: 'AwTableRowHidden',

    props: {
        row: {},

        rowIndex: {
            type: Number,
            default: 0
        },

        hiddenColsIndexes: {
            type: Array,
            default: () => []
        },

        colspan: {
            type: Number,
            default: null
        },

        columns: {
            type: Array,
            required: true
        },

        open: Boolean
    },

    render(h) {
        return this.hiddenColsIndexes.length
            ? h('tr', {}, [
                  h(
                      'AwAccordionFold',
                      {
                          props: { tag: 'td', show: this.open },
                          staticClass: 'bg-surface border-t',
                          attrs: { colspan: this.colspan }
                      },
                      [
                          h('table', { staticClass: 'w-full m-2 lg:mx-4' }, [
                              h(
                                  'tbody',
                                  {},
                                  this.columns.reduce((acc, vNode, i) => {
                                      if (this.hiddenColsIndexes.includes(i)) {
                                          const props =
                                              vNode.componentOptions.propsData

                                          props.rowData = this.row
                                          props.rowIndex = this.rowIndex

                                          return acc.concat(vNode)
                                      } else {
                                          return acc
                                      }
                                  }, [])
                              )
                          ])
                      ]
                  )
              ])
            : null
    }
}
</script>
