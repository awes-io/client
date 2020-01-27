---
metaTitle: Timeline builder сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwTimelineBuilder /&gt; component is used to render Timeline builder - UI Vue component for Awes.io.
title: Timeline builder
---
# Timeline builder

The `AwTimelineBuilder` component is used to render Timeline builder.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwTimelineBuilder`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-timeline-builder&module=%2Fpages%2Faw-timeline-builder.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-timeline-builder&module=%2Fpages%2Faw-timeline-builder.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwTimelineBuilder` component.
<!-- @vuese:AwTimelineBuilder:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|collection|-|`Object`|`true`|-|

<!-- @vuese:AwTimelineBuilder:props:end -->


### Slots
Below is a collection of Vue **slots** for the `AwTimelineBuilder` component.
<!-- @vuese:AwTimelineBuilder:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|info|

<!-- @vuese:AwTimelineBuilder:slots:end -->



### Events
Below is a collection of Vue **events** for the `AwTimelineBuilder` component.
<!-- @vuese:AwTimelineBuilder:events:start -->

<!-- @vuese:AwTimelineBuilder:events:end -->
## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Timeline builder">
        <AwTimelineBuilder />
    </AwPage>
</template>

<script>
import { AwPage, AwTimelineBuilder } from '@awes-io/ui'

export default {
    name: 'Timeline builder',

    components: {
        AwPage,
        AwTimelineBuilder
    }
}
</script>

```

