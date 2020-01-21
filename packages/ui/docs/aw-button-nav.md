---
metaTitle: Button nav сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwButtonNav /&gt; component is used to render Button nav - UI Vue component for Awes.io.
title: Button nav
---
# Button nav

The `AwButtonNav` component is used to render Button nav.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwButtonNav`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-button-nav&module=%2Fpages%2Faw-button-nav.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-button-nav&module=%2Fpages%2Faw-button-nav.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwButtonNav` component.
<!-- @vuese:AwButtonNav:props:start -->

<!-- @vuese:AwButtonNav:props:end -->

### Slots
Below is a collection of Vue **slots** for the `AwButtonNav` component.
<!-- @vuese:AwButtonNav:slots:start -->

<!-- @vuese:AwButtonNav:slots:end -->

### Events
Below is a collection of Vue **events** for the `AwButtonNav` component.
<!-- @vuese:AwButtonNav:events:start -->

<!-- @vuese:AwButtonNav:events:end -->
## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Button nav">
        <AwButtonNav />
    </AwPage>
</template>

<script>
import { AwPage, AwButtonNav } from '@awes-io/ui'

export default {
    name: 'Button nav',

    components: {
        AwPage,
        AwButtonNav
    }
}
</script>

```

