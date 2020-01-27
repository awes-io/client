---
metaTitle: Chip сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwChip /&gt; component is used to render Chip - UI Vue component for Awes.io.
title: Chip
---
# Chip

The `AwChip` component is used to render Chip.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwChip`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-chip&module=%2Fpages%2Faw-chip.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-chip&module=%2Fpages%2Faw-chip.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwChip` component.
<!-- @vuese:AwChip:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|icon|-|`String`|`false`|-|
|text|-|`String`|`false`|-|
|color|-|`String`|`false`|info|
|fill|-|`Boolean`|`false`|-|

<!-- @vuese:AwChip:props:end -->


### Slots
Below is a collection of Vue **slots** for the `AwChip` component.
<!-- @vuese:AwChip:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|icon|icon|-|
|text|text|-|
|default|-|-|
|button|close|-|

<!-- @vuese:AwChip:slots:end -->



## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Chip">
        <AwChip />
    </AwPage>
</template>

<script>
import { AwPage, AwChip } from '@awes-io/ui'

export default {
    name: 'Chip',

    components: {
        AwPage,
        AwChip
    }
}
</script>

```

