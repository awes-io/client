<script>
import { path } from 'rambdax'
import { TABLE_PRIORITY_ATTR, TABLE_INDEX_ATTR } from '../assets/js/constants'
import AwTableRowToggler from './AwTableRowToggler.vue'
import AwTableRowHidden from './AwTableRowHidden.vue'

function getCellData(field, rowData) {
    return field ? path(field, rowData) : rowData
}

function getContent(cell, slot, index) {
    return slot ? slot({ cell, index }) : cell
}

export default {
    name: 'AwTableRow',

    functional: true,

    props: {
        rowData: {},

        rowIndex: {
            required: true
        },

        active: Boolean,

        hasRowClickListener: Boolean,

        visibleColumns: {
            type: Array,
            required: true
        },

        hiddenColumns: {
            type: Array,
            default: () => []
        }
    },

    render(h, { props }) {
        const {
            rowData,
            rowIndex: index,
            active,
            hasRowClickListener,
            visibleColumns,
            hiddenColumns
        } = props

        const hasHidden = !!hiddenColumns.length

        return [
            // visible row
            h(
                'tr',
                {
                    staticClass:
                        'bg-surface hover:bgcolor-muted hover:text-on-muted',
                    class: { 'cursor-pointer': hasRowClickListener },
                    attrs: {
                        [TABLE_INDEX_ATTR]: hasRowClickListener ? index : null
                    }
                },
                visibleColumns
                    .map(
                        ({
                            field,
                            slot,
                            verticalAlign,
                            textAlign,
                            priority,
                            staticClass
                        }) => {
                            return h(
                                'td',
                                {
                                    staticClass: 'py-3 px-4 lg:px-6',
                                    class: [
                                        staticClass,
                                        `align-${verticalAlign}`,
                                        {
                                            [`text-${textAlign}`]: textAlign,
                                            'border-t': index > 0
                                        }
                                    ],
                                    attrs: {
                                        [TABLE_PRIORITY_ATTR]:
                                            index > 0 ? null : priority
                                    }
                                },
                                getContent(
                                    getCellData(field, rowData),
                                    slot,
                                    index
                                )
                            )
                        }
                    )
                    .concat(
                        h(AwTableRowToggler, {
                            props: {
                                show: hasHidden,
                                active,
                                index
                            }
                        })
                    )
            ),

            // hidden row
            h(
                'tr',
                {
                    class: { 'cursor-pointer': hasRowClickListener },
                    attrs: {
                        [TABLE_INDEX_ATTR]: hasRowClickListener ? index : null
                    }
                },
                [
                    h(
                        'AwAccordionFold',
                        {
                            props: { tag: 'td', show: active },
                            staticClass: 'bg-surface border-t',
                            attrs: { colspan: visibleColumns.length + 1 }
                        },
                        [
                            h('table', { staticClass: 'm-2 lg:mx-4' }, [
                                h(
                                    'tbody',
                                    {},
                                    hiddenColumns.map(
                                        ({ field, title, slot }) => {
                                            return h(AwTableRowHidden, {
                                                props: {
                                                    title,
                                                    cell: getCellData(
                                                        field,
                                                        rowData
                                                    ),
                                                    index
                                                },
                                                scopedSlots: {
                                                    default: slot
                                                }
                                            })
                                        }
                                    )
                                )
                            ])
                        ]
                    )
                ]
            )
        ]
    }
}
</script>
