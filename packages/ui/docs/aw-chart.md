---
metaTitle: Chart сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwChart /&gt; component is used to render Chart - UI Vue component for Awes.io.
title: Chart
---
# Chart

The `AwChart` component is used to render Chart.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwChart`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-chart&module=%2Fpages%2Faw-chart.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-chart&module=%2Fpages%2Faw-chart.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwChart` component.
<!-- @vuese:AwChart:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|data|-|`Object`|`true`|-|
|show|-|`Boolean`|`false`|-|
|options|-|`Object`|`false`|-|
|type|-|`String`|`false`|line|
|height|-|`Number`|`false`|150|

<!-- @vuese:AwChart:props:end -->


### Slots
Below is a collection of Vue **slots** for the `AwChart` component.
<!-- @vuese:AwChart:slots:start -->

<!-- @vuese:AwChart:slots:end -->

### Events
Below is a collection of Vue **events** for the `AwChart` component.
<!-- @vuese:AwChart:events:start -->

<!-- @vuese:AwChart:events:end -->
## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Chart">
        <AwChart />
    </AwPage>
</template>

<script>
import { AwPage, AwChart } from '@awes-io/ui'

export default {
    name: 'Chart',

    components: {
        AwPage,
        AwChart
    }
}
</script>

```

