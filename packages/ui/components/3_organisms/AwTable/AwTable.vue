<template>
    <table
        class="w-full text-sm leading-snug overflow-hidden max-w-full shadow-md"
    >
        <!-- Table head, passes `thead` object to the scope -->
        <slot name="thead" :thead="theadVisible">
            <!-- `AwTableHead` component -->
            <AwTableHead :columns="theadVisible" @click="onTheadClick" />
        </slot>

        <!-- body -->
        <tbody @click="handleRowClick">
            <!-- Table row component, recieves `rows` prop -->
            <slot name="tr" :rows="rows">
                <template v-for="(rowData, rowIndex) in rows">
                    <AwTableRow
                        :key="rowData.id || rowIndex"
                        v-bind="{
                            rowData,
                            rowIndex,
                            active: openedRow === rowIndex,
                            hasRowClickListener,
                            ...groupedColumns
                        }"
                    />
                </template>
            </slot>
        </tbody>

        <!-- footer -->
        <slot name="tfoot">
            <!-- <AwTableFoot /> -->
        </slot>
    </table>
</template>

<script>
import { keys, path, pathOr, is, mergeDeepRight } from 'rambdax'
import { ucFirst, toPascal } from '@AwUtils/string'
import { conf } from '@AwUtils/component'
import {
    TABLE_PRIORITY_ATTR,
    TABLE_TOGGLER_ATTR,
    TABLE_INDEX_ATTR,
    TABLE_ROW_CLICK_EVENT,
    TABLE_HEAD_CLICK_EVENT
} from '@AwUtils/constants'
import AwTableHead from '@AwOrganisms/AwTable/_AwTableHead.vue'
import AwTableCol from '@AwOrganisms/AwTable/_AwTableCol.vue'
import AwTableRow from '@AwOrganisms/AwTable/_AwTableRow.vue'
import unmaskParams from '@AwUtils/unmask-param'
import { AwTable as _config } from '@AwConfig'

const WIDTH_THRESHOLD = 50 // px
const RESIZE_DEBOUNCE = 500 // ms
const TABLE_COL_NAME = toPascal(AwTableCol.name)

export default {
    name: 'AwTable',

    components: {
        AwTableHead,
        AwTableRow
    },

    _config,

    props: {
        rows: {
            type: Array,
            required: true
        },

        verticalAlign: {
            type: String,
            validator(value) {
                return ['align-bottom', 'align-middle', 'align-top'].includes(
                    `align-${value}`
                )
            },
            default: 'middle'
        },

        /**
         * Orderable config that will be merged with global orderable config.
         * If null then global orderable config will be used
         */
        orderable: {
            type: Object,
            default: null
        }
    },

    data() {
        return {
            hiddenColsIndexes: [],
            openedRow: null,
            isDefaultColSet: false
        }
    },

    computed: {
        columns() {
            const _slots =
                this.$scopedSlots.default && this.$scopedSlots.default()

            if (Array.isArray(_slots)) {
                return _slots
                    .filter(this._isColumnComponent)
                    .map(({ data = {} }, i) => {
                        const props = data.attrs || {}
                        const slot = path('scopedSlots.default', data)
                        const staticClass = pathOr('', 'staticClass', data)
                        const field = path('field', props)
                        const title = pathOr(
                            field ? ucFirst(field) : '',
                            'title',
                            props
                        )
                        const colOrderableConfig = pathOr(
                            false,
                            'orderable',
                            props
                        )
                        const orderable = this._getOredableConfig(
                            colOrderableConfig,
                            field
                        )

                        return {
                            field,
                            verticalAlign: pathOr(
                                this.verticalAlign,
                                'verticalAlign',
                                props
                            ),
                            priority: pathOr(i, 'priority', props),
                            title,
                            textAlign: path('textAlign', props),
                            slot,
                            staticClass,
                            orderable
                        }
                    })
            } else {
                return keys(this.rows[0]).map((field, priority) => ({
                    field,
                    title: ucFirst(field),
                    priority,
                    verticalAlign: this.verticalAlign
                }))
            }
        },

        groupedColumns() {
            const columns = this.columns
            const visibleColumns = []
            const hiddenColumns = []

            for (let i = 0, max = columns.length; i < max; i++) {
                if (this.hiddenColsIndexes.includes(i)) {
                    hiddenColumns.push(columns[i])
                } else {
                    visibleColumns.push(columns[i])
                }
            }

            return { visibleColumns, hiddenColumns }
        },

        theadVisible() {
            const { visibleColumns, hiddenColumns } = this.groupedColumns

            return visibleColumns
                .map(({ title, textAlign, orderable }) => ({
                    text: title,
                    align: textAlign && `text-${textAlign}`,
                    orderable
                }))
                .concat(hiddenColumns.length ? [{ text: '' }] : [])
        },

        hasRowClickListener() {
            return TABLE_ROW_CLICK_EVENT in this.$listeners
        }
    },

    watch: {
        rows() {
            this.openedRow = null
        }
    },

    mounted() {
        if (!this.$scopedSlots.tr) {
            this.$nextTick(this.setResizeListener)
        }
    },

    methods: {
        toggleRow(index) {
            this.openedRow = this.openedRow === index ? null : index
        },

        onTheadClick(column, key) {
            this.$emit(TABLE_HEAD_CLICK_EVENT, this.columns[key])
        },

        _getOredableConfig(colConfig, field) {
            const baseConfig = mergeDeepRight(
                conf(this, 'orderable'),
                this.orderable || {}
            )

            if (is(Object, colConfig)) {
                const config = { ...colConfig }
                delete config.param
                const conf = mergeDeepRight(baseConfig, config)
                if (!this.isDefaultColSet && conf.default) {
                    this.isDefaultColSet = true
                } else {
                    conf.default = false
                }
                return this._unmaskOrderableConfig(conf, field)
            } else if (is(Boolean, colConfig) && !colConfig) {
                return null
            }

            if (!this.isDefaultColSet && baseConfig.default) {
                this.isDefaultColSet = true
            } else {
                baseConfig.default = false
            }

            return this._unmaskOrderableConfig(baseConfig, field)
        },

        _unmaskOrderableConfig(orderable, field) {
            const templateDefaultVal = orderable.templateValue || field
            const ascValue = unmaskParams(
                orderable.ascTemplate,
                templateDefaultVal
            )
            const descValue = unmaskParams(
                orderable.descTemplate,
                templateDefaultVal
            )

            return {
                ...orderable,
                ascValue,
                descValue
            }
        },

        setResizeListener() {
            let resizeTm

            const onResize = () => {
                clearTimeout(resizeTm)
                resizeTm = setTimeout(async () => {
                    // reset indexes if needed and await DOM update
                    if (this.hiddenColsIndexes.length) {
                        this.hiddenColsIndexes = []
                        await this.$nextTick()
                    }

                    // get calculated columns
                    const newIndexes = this._getHiddenColsIndexes()

                    if (!newIndexes.length) {
                        this.openedRow = null
                    }
                    this.hiddenColsIndexes = newIndexes
                }, RESIZE_DEBOUNCE)
            }

            // first time calculations
            this.$nextTick(() => {
                this.hiddenColsIndexes = this._getHiddenColsIndexes()
            })

            window.addEventListener('resize', onResize)

            this.$once('hook:beforeDestroy', () => {
                clearTimeout(resizeTm)
                window.removeEventListener('resize', onResize)
            })
        },

        checkIfButtonOrLink(el) {
            const elements = ['BUTTON', 'A']
            let node = el
            while (node) {
                if (elements.indexOf(node.tagName.toUpperCase()) > -1) {
                    return true
                }
                node = node.parentElement
            }
            return false
        },

        handleRowClick($event) {
            const target = $event.target

            if (this.checkIfButtonOrLink(target)) return

            const toggler = target.hasAttribute(TABLE_TOGGLER_ATTR)
                ? target
                : target.closest(`[${TABLE_TOGGLER_ATTR}]`)

            // hidden row toggler click
            if (toggler) {
                const index = parseInt(toggler.getAttribute(TABLE_TOGGLER_ATTR))
                this.toggleRow(index)
                return
            }

            // if table has no row click listener exit
            if (!this.hasRowClickListener) return

            const row = target.closest(`[${TABLE_INDEX_ATTR}]`)

            if (row) {
                const index = parseInt(row.getAttribute(TABLE_INDEX_ATTR))
                const data = this.rows[index]
                this.$emit(TABLE_ROW_CLICK_EVENT, data, index, $event)
            }
        },

        // Filters only AwTableCol components from scoped slot
        _isColumnComponent(vNode) {
            const tagName = pathOr('', 'tag', vNode)
            const tagNamePascal = toPascal(tagName)

            return tagNamePascal === TABLE_COL_NAME
        },

        _getParentEl() {
            return pathOr(null, '$el.parentElement', this)
        },

        _getFirstRow() {
            return this.$el && this.$el.querySelectorAll
                ? Array.from(
                      this.$el.querySelectorAll(
                          `tbody > :first-child > [${TABLE_PRIORITY_ATTR}]`
                      )
                  )
                : []
        },

        _hasOverflowWidth() {
            const parent = this._getParentEl()

            if (parent) {
                return parent.clientWidth < this.$el.scrollWidth
            } else {
                return false
            }
        },

        _sortColumnsByPriority(columns) {
            return columns
                .map((el, index) => ({ el, index }))
                .sort((a, b) => {
                    // parseFloat accepts Infinity value
                    const aPrior = parseFloat(
                        a.el.getAttribute(TABLE_PRIORITY_ATTR)
                    )
                    const bPrior = parseFloat(
                        b.el.getAttribute(TABLE_PRIORITY_ATTR)
                    )

                    return aPrior - bPrior
                })
        },

        _getHiddenColsIndexes() {
            // manipulate only first row
            const columns = this._getFirstRow()

            let hiddenIndexes = []

            if (this._hasOverflowWidth()) {
                // calculate columns
                const sorted = this._sortColumnsByPriority(columns)

                let maxWidth = this._getParentEl().clientWidth

                hiddenIndexes = sorted.reduce((acc, { el, index }) => {
                    // subtract el width from global width
                    maxWidth -= el.offsetWidth

                    return maxWidth < WIDTH_THRESHOLD ? acc.concat(index) : acc
                }, [])
            }

            return hiddenIndexes
        }
    }
}
</script>
