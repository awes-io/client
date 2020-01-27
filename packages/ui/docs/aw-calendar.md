---
metaTitle: Calendar сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwCalendar /&gt; component is used to render Calendar - UI Vue component for Awes.io.
title: Calendar
---
# Calendar

The `AwCalendar` component is used to render Calendar.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwCalendar`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-calendar&module=%2Fpages%2Faw-calendar.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-calendar&module=%2Fpages%2Faw-calendar.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwCalendar` component.
<!-- @vuese:AwCalendar:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|-|`String` /  `Number` /  `Object` /  `Date`|`false`|-|
|min|-|`String` /  `Number` /  `Object` /  `Date`|`false`|-|
|max|-|`String` /  `Number` /  `Object` /  `Date`|`false`|-|
|disabledDays|-|`Function`|`false`|-|

<!-- @vuese:AwCalendar:props:end -->







### Events
Below is a collection of Vue **events** for the `AwCalendar` component.
<!-- @vuese:AwCalendar:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|

<!-- @vuese:AwCalendar:events:end -->







## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Calendar">
        <AwCalendar />
    </AwPage>
</template>

<script>
import { AwPage, AwCalendar } from '@awes-io/ui'

export default {
    name: 'Calendar',

    components: {
        AwPage,
        AwCalendar
    }
}
</script>

```

