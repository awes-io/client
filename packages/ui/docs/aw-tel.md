---
metaTitle: Tel сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwTel /&gt; component is used to render Tel - UI Vue component for Awes.io.
title: Tel
---
# Tel

The `AwTel` component is used to render Tel.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwTel`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-input&module=%2Fpages%2Faw-input.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-input&module=%2Fpages%2Faw-input.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwTel` component.
<!-- @vuese:AwTel:props:start -->

<!-- @vuese:AwTel:props:end -->

### Slots
Below is a collection of Vue **slots** for the `AwTel` component.
<!-- @vuese:AwTel:slots:start -->

<!-- @vuese:AwTel:slots:end -->

### Events
Below is a collection of Vue **events** for the `AwTel` component.
<!-- @vuese:AwTel:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|

<!-- @vuese:AwTel:events:end -->


## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Tel">
        <AwTel />
    </AwPage>
</template>

<script>
import { AwPage, AwTel } from '@awes-io/ui'

export default {
    name: 'Tel',

    components: {
        AwPage,
        AwTel
    }
}
</script>

```

