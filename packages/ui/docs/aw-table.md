---
metaTitle: Table сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwTable /&gt; component is used to render Table - UI Vue component for Awes.io.
title: Table
---
# Table

The `AwTable` component is used to render Table.


## Usage
Several examples how you can use `AwTable`.

### Live Example
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-table&module=%2Fpages%2Faw-table.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwTable` component.
<!-- @vuese:AwTable:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|rows|-|`Array`|`true`|-|
|verticalAlign|-|`String`|`false`|middle|
|orderable|Orderable config that will be merged with global orderable config. If null then global orderable config will be used|`Object`|`false`|-|

<!-- @vuese:AwTable:props:end -->

### Slots
Below is a collection of Vue **slots** for the `AwTable` component.
<!-- @vuese:AwTable:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|thead|Table head, passes `thead` object to the scope|`AwTableHead` component|
|tr|Table row component, recieves `rows` prop|-|
|tfoot|footer|<AwTableFoot />|
|default|-|-|

<!-- @vuese:AwTable:slots:end -->

### Events
Below is a collection of Vue **events** for the `AwTable` component.
<!-- @vuese:AwTable:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|`TABLE_HEAD_CLICK_EVENT`|-|-|
|`TABLE_ROW_CLICK_EVENT`|-|-|

<!-- @vuese:AwTable:events:end -->
