---
metaTitle: Info сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwInfo /&gt; component is used to render Info - UI Vue component for Awes.io.
title: Info
---
# Info

The `AwInfo` component is used to render Info.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwInfo`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-info&module=%2Fpages%2Faw-info.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-info&module=%2Fpages%2Faw-info.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwInfo` component.
<!-- @vuese:AwInfo:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|label|-|`String`|`false`|-|
|text|-|`String` /  `Number`|`false`|-|

<!-- @vuese:AwInfo:props:end -->


### Slots
Below is a collection of Vue **slots** for the `AwInfo` component.
<!-- @vuese:AwInfo:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:AwInfo:slots:end -->



### Events
Below is a collection of Vue **events** for the `AwInfo` component.
<!-- @vuese:AwInfo:events:start -->

<!-- @vuese:AwInfo:events:end -->
## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Info">
        <AwInfo />
    </AwPage>
</template>

<script>
import { AwPage, AwInfo } from '@awes-io/ui'

export default {
    name: 'Info',

    components: {
        AwPage,
        AwInfo
    }
}
</script>

```

