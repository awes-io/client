# AwTableCol

## Props

<!-- @vuese:AwTableCol:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|field|Path to prop in `rowData` object|`String`|`false`|-|
|title|Column title in `thead`|`String`|`false`|-|
|textAlign|Text align of column title in `thead` and text in column cells|'left' / 'center' / 'right'|`false`|left|
|verticalAlign|Vertical align of text in cells|'bottom' / 'middle' / 'top'|`false`|The default value is inherited from table component|
|priority|The higher priority goes to mobile view earlier|`Number`|`false`|-|
|orderable|Orderable config that will be merged with global orderable config. If true then global orderable config will be used If false order by click is disabled|`Boolean` /  `Object`|`false`|-|

<!-- @vuese:AwTableCol:props:end -->

## Slots

<!-- @vuese:AwTableCol:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:AwTableCol:slots:end -->

