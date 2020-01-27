---
metaTitle: Search сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwSearch /&gt; component is used to render Search - UI Vue component for Awes.io.
title: Search
---
# Search

The `AwSearch` component is used to render Search.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwSearch`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-search&module=%2Fpages%2Faw-search.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-search&module=%2Fpages%2Faw-search.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwSearch` component.
<!-- @vuese:AwSearch:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|param|-|`String`|`false`|search|
|debounce|-|`Number`|`false`|400|

<!-- @vuese:AwSearch:props:end -->



### Slots
Below is a collection of Vue **slots** for the `AwSearch` component.
<!-- @vuese:AwSearch:slots:start -->

<!-- @vuese:AwSearch:slots:end -->

### Events
Below is a collection of Vue **events** for the `AwSearch` component.
<!-- @vuese:AwSearch:events:start -->

<!-- @vuese:AwSearch:events:end -->
## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Search">
        <AwSearch />
    </AwPage>
</template>

<script>
import { AwPage, AwSearch } from '@awes-io/ui'

export default {
    name: 'Search',

    components: {
        AwPage,
        AwSearch
    }
}
</script>

```

