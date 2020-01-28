---
metaTitle: Tab nav сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwTabNav /&gt; component is used to render Tab nav - UI Vue component for Awes.io.
title: Tab nav
---
# Tab nav

The `AwTabNav` component is used to render Tab nav.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwTabNav`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-tab-nav&module=%2Fpages%2Faw-tab-nav.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-tab-nav&module=%2Fpages%2Faw-tab-nav.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwTabNav` component.
<!-- @vuese:AwTabNav:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|items|Array of tab objects with `text` property or array of strings which become button names <AwTabNav :items="[{ text: 'One', href: '/one' }, { text: 'Two', href: '/two' }]" /> <AwTabNav :items="['One', 'Two']" />|`Array`|`true`|-|
|active|Active tab index (for button tabs)|`Number`|`false`|-|

<!-- @vuese:AwTabNav:props:end -->





### Slots
Below is a collection of Vue **slots** for the `AwTabNav` component.
<!-- @vuese:AwTabNav:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:AwTabNav:slots:end -->






### Events
Below is a collection of Vue **events** for the `AwTabNav` component.
<!-- @vuese:AwTabNav:events:start -->

<!-- @vuese:AwTabNav:events:end -->
## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Tab nav">
        <AwTabNav />
    </AwPage>
</template>

<script>
import { AwPage, AwTabNav } from '@awes-io/ui'

export default {
    name: 'Tab nav',

    components: {
        AwPage,
        AwTabNav
    }
}
</script>

```

