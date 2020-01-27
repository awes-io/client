---
metaTitle: Grid сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwGrid /&gt; component is used to render Grid - UI Vue component for Awes.io.
title: Grid
---
# Grid

The `AwGrid` component is used to render Grid.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwGrid`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-grid&module=%2Fpages%2Faw-grid.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-grid&module=%2Fpages%2Faw-grid.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwGrid` component.
<!-- @vuese:AwGrid:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|col|-|`Number` /  `Object`|`false`|1|
|gap|-|`Number`|`false`|4|

<!-- @vuese:AwGrid:props:end -->




### Slots
Below is a collection of Vue **slots** for the `AwGrid` component.
<!-- @vuese:AwGrid:slots:start -->

<!-- @vuese:AwGrid:slots:end -->

### Events
Below is a collection of Vue **events** for the `AwGrid` component.
<!-- @vuese:AwGrid:events:start -->

<!-- @vuese:AwGrid:events:end -->
## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Grid">
        <AwGrid />
    </AwPage>
</template>

<script>
import { AwPage, AwGrid } from '@awes-io/ui'

export default {
    name: 'Grid',

    components: {
        AwPage,
        AwGrid
    }
}
</script>

```

