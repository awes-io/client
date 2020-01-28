---
metaTitle: Icon сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwIcon /&gt; component is used to render Icon - UI Vue component for Awes.io.
title: Icon
---
# Icon

The `AwIcon` component is used to render Icon.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwIcon`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-icon&module=%2Fpages%2Faw-icon.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-icon&module=%2Fpages%2Faw-icon.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwIcon` component.
<!-- @vuese:AwIcon:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|name|-|`String`|`true`|-|
|size|-|`String`|`false`|-|
|className|-|`String`|`false`|-|

<!-- @vuese:AwIcon:props:end -->





### Slots
Below is a collection of Vue **slots** for the `AwIcon` component.
<!-- @vuese:AwIcon:slots:start -->

<!-- @vuese:AwIcon:slots:end -->

### Events
Below is a collection of Vue **events** for the `AwIcon` component.
<!-- @vuese:AwIcon:events:start -->

<!-- @vuese:AwIcon:events:end -->
## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Icon">
        <AwIcon />
    </AwPage>
</template>

<script>
import { AwPage, AwIcon } from '@awes-io/ui'

export default {
    name: 'Icon',

    components: {
        AwPage,
        AwIcon
    }
}
</script>

```

