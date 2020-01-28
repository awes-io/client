---
metaTitle: Date сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwDate /&gt; component is used to render Date - UI Vue component for Awes.io.
title: Date
---
# Date

The `AwDate` component is used to render Date.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwDate`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-date&module=%2Fpages%2Faw-date.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-date&module=%2Fpages%2Faw-date.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwDate` component.
<!-- @vuese:AwDate:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|format|-|`String`|`false`|-|

<!-- @vuese:AwDate:props:end -->






  
### Slots
Below is a collection of Vue **slots** for the `AwDate` component.
<!-- @vuese:AwDate:slots:start -->

<!-- @vuese:AwDate:slots:end -->

### Events
Below is a collection of Vue **events** for the `AwDate` component.
<!-- @vuese:AwDate:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|

<!-- @vuese:AwDate:events:end -->






  

## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Date">
        <AwDate />
    </AwPage>
</template>

<script>
import { AwPage, AwDate } from '@awes-io/ui'

export default {
    name: 'Date',

    components: {
        AwPage,
        AwDate
    }
}
</script>

```

