---
metaTitle: Modal сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwModal /&gt; component is used to render Modal - UI Vue component for Awes.io.
title: Modal
---
# Modal

The `AwModal` component is used to render Modal.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwModal`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-modal&module=%2Fpages%2Faw-modal.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-modal&module=%2Fpages%2Faw-modal.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwModal` component.
<!-- @vuese:AwModal:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|title|-|`String`|`false`|-|
|stay|-|`Boolean`|`false`|-|
|bgClickClose|-|`Boolean`|`false`|-|
|name|-|`String`|`false`|-|
|param|-|`String`|`false`|modal|
|theme|-|`String`|`false`|default|
|className|-|`String`|`false`|-|

<!-- @vuese:AwModal:props:end -->





### Slots
Below is a collection of Vue **slots** for the `AwModal` component.
<!-- @vuese:AwModal:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:AwModal:slots:end -->






### Events
Below is a collection of Vue **events** for the `AwModal` component.
<!-- @vuese:AwModal:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|closed|-|-|

<!-- @vuese:AwModal:events:end -->






## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Modal">
        <AwModal />
    </AwPage>
</template>

<script>
import { AwPage, AwModal } from '@awes-io/ui'

export default {
    name: 'Modal',

    components: {
        AwPage,
        AwModal
    }
}
</script>

```

