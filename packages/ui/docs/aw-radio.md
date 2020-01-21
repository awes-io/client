---
metaTitle: Radio сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwRadio /&gt; component is used to render Radio - UI Vue component for Awes.io.
title: Radio
---
# Radio

The `AwRadio` component is used to render Radio.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwRadio`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-radio&module=%2Fpages%2Faw-radio.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-radio&module=%2Fpages%2Faw-radio.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwRadio` component.
<!-- @vuese:AwRadio:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|-|`String` /  `Number`|`false`|on|
|checked|-|`String` /  `Number`|`false`|-|

<!-- @vuese:AwRadio:props:end -->

### Slots
Below is a collection of Vue **slots** for the `AwRadio` component.
<!-- @vuese:AwRadio:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|label|-|-|
|error|-|-|

<!-- @vuese:AwRadio:slots:end -->


### Events
Below is a collection of Vue **events** for the `AwRadio` component.
<!-- @vuese:AwRadio:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|change|-|-|

<!-- @vuese:AwRadio:events:end -->


## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Radio">
        <AwRadio />
    </AwPage>
</template>

<script>
import { AwPage, AwRadio } from '@awes-io/ui'

export default {
    name: 'Radio',

    components: {
        AwPage,
        AwRadio
    }
}
</script>

```

