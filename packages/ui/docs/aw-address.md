---
metaTitle: Address сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwAddress /&gt; component is used to render Address - UI Vue component for Awes.io.
title: Address
---
# Address

The `AwAddress` component is used to render Address.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwAddress`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-address&module=%2Fpages%2Faw-address.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-address&module=%2Fpages%2Faw-address.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwAddress` component.
<!-- @vuese:AwAddress:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|queryOptions|-|`Object`|`false`|-|

<!-- @vuese:AwAddress:props:end -->



### Events
Below is a collection of Vue **events** for the `AwAddress` component.
<!-- @vuese:AwAddress:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|

<!-- @vuese:AwAddress:events:end -->



## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Address">
        <AwAddress />
    </AwPage>
</template>

<script>
import { AwPage, AwAddress } from '@awes-io/ui'

export default {
    name: 'Address',

    components: {
        AwPage,
        AwAddress
    }
}
</script>

```

