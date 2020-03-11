---
metaTitle: Card сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwCard /&gt; component is used to render Card - UI Vue component for Awes.io.
title: Card
---
# Card

The `AwCard` component is used to render Card.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwCard`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-card&module=%2Fpages%2Faw-card.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-card&module=%2Fpages%2Faw-card.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwCard` component.
<!-- @vuese:AwCard:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|background|-|`String`|`false`|-|
|title|-|`String`|`false`|-|
|text|-|`String`|`false`|-|
|link|If present transforms title into link with given href|`String`|`false`|-|

<!-- @vuese:AwCard:props:end -->

### Slots
Below is a collection of Vue **slots** for the `AwCard` component.
<!-- @vuese:AwCard:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:AwCard:slots:end -->

## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Card">
        <AwCard />
    </AwPage>
</template>

<script>
import { AwPage, AwCard } from '@awes-io/ui'

export default {
    name: 'Card',

    components: {
        AwPage,
        AwCard
    }
}
</script>

```

