---
metaTitle: Cropper сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwCropper /&gt; component is used to render Cropper - UI Vue component for Awes.io.
title: Cropper
---
# Cropper

The `AwCropper` component is used to render Cropper.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwCropper`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-cropper&module=%2Fpages%2Faw-cropper.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-cropper&module=%2Fpages%2Faw-cropper.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwCropper` component.
<!-- @vuese:AwCropper:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|src|-|`String`|`true`|-|
|width|-|`String` /  `Number`|`false`|200|
|height|-|`String` /  `Number`|`false`|200|
|padding|-|`String` /  `Number`|`false`|100|
|format|-|`String`|`false`|png|
|quality|-|`String` /  `Number`|`false`|1|

<!-- @vuese:AwCropper:props:end -->




### Slots
Below is a collection of Vue **slots** for the `AwCropper` component.
<!-- @vuese:AwCropper:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|upload|-|-|
|buttons|-|rotate|

<!-- @vuese:AwCropper:slots:end -->





### Events
Below is a collection of Vue **events** for the `AwCropper` component.
<!-- @vuese:AwCropper:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|save|-|-|
|cancel|-|-|

<!-- @vuese:AwCropper:events:end -->





## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Cropper">
        <AwCropper />
    </AwPage>
</template>

<script>
import { AwPage, AwCropper } from '@awes-io/ui'

export default {
    name: 'Cropper',

    components: {
        AwPage,
        AwCropper
    }
}
</script>

```

