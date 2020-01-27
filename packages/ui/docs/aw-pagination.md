---
metaTitle: Pagination сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwPagination /&gt; component is used to render Pagination - UI Vue component for Awes.io.
title: Pagination
---
# Pagination

The `AwPagination` component is used to render Pagination.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwPagination`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-form&module=%2Fpages%2Faw-form.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-form&module=%2Fpages%2Faw-form.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwPagination` component.
<!-- @vuese:AwPagination:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|total|Total number of items|`Number`|`true`|-|
|page|Current page|`Number`|`false`|1|
|limit|Limit of items per page|`Number`|`true`|-|
|limits|Default limit variants|`Array`|`false`|-|

<!-- @vuese:AwPagination:props:end -->



### Slots
Below is a collection of Vue **slots** for the `AwPagination` component.
<!-- @vuese:AwPagination:slots:start -->

<!-- @vuese:AwPagination:slots:end -->

### Events
Below is a collection of Vue **events** for the `AwPagination` component.
<!-- @vuese:AwPagination:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|click:page|-|-|

<!-- @vuese:AwPagination:events:end -->




## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Pagination">
        <AwPagination />
    </AwPage>
</template>

<script>
import { AwPage, AwPagination } from '@awes-io/ui'

export default {
    name: 'Pagination',

    components: {
        AwPage,
        AwPagination
    }
}
</script>

```

