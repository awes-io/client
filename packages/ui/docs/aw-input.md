---
metaTitle: Input сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwInput /&gt; component is used to render Input - UI Vue component for Awes.io.
title: Input
---
# Input

The `AwInput` component is used to render Input.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwInput`.

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
Below is a collection of Vue **props** for the `AwInput` component.
<!-- @vuese:AwInput:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|type|-|`String`|`false`|text|
|size|-|`String`|`false`|md|

<!-- @vuese:AwInput:props:end -->





### Slots
Below is a collection of Vue **slots** for the `AwInput` component.
<!-- @vuese:AwInput:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|icon|-|-|
|error|-|-|

<!-- @vuese:AwInput:slots:end -->






### Events
Below is a collection of Vue **events** for the `AwInput` component.
<!-- @vuese:AwInput:events:start -->

<!-- @vuese:AwInput:events:end -->
## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Input">
        <AwInput />
    </AwPage>
</template>

<script>
import { AwPage, AwInput } from '@awes-io/ui'

export default {
    name: 'Input',

    components: {
        AwPage,
        AwInput
    }
}
</script>

```

