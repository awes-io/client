---
metaTitle: Link сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwLink /&gt; component is used to render Link - UI Vue component for Awes.io.
title: Link
---
# Link

The `AwLink` component is used to render Link.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwLink`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-link&module=%2Fpages%2Faw-link.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-link&module=%2Fpages%2Faw-link.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwLink` component.
<!-- @vuese:AwLink:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|href|-|`String` /  `Object`|`false`|-|
|className|-|`String`|`false`|-|
|text|-|`String`|`false`|-|
|tag|-|`String`|`false`|-|

<!-- @vuese:AwLink:props:end -->

### Slots
Below is a collection of Vue **slots** for the `AwLink` component.
<!-- @vuese:AwLink:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:AwLink:slots:end -->


### Events
Below is a collection of Vue **events** for the `AwLink` component.
<!-- @vuese:AwLink:events:start -->

<!-- @vuese:AwLink:events:end -->
## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Link">
        <AwLink />
    </AwPage>
</template>

<script>
import { AwPage, AwLink } from '@awes-io/ui'

export default {
    name: 'Link',

    components: {
        AwPage,
        AwLink
    }
}
</script>

```

