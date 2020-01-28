---
metaTitle: Form сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwForm /&gt; component is used to render Form - UI Vue component for Awes.io.
title: Form
---
# Form

The `AwForm` component is used to render Form.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwForm`.

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
Below is a collection of Vue **props** for the `AwForm` component.
<!-- @vuese:AwForm:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|url|-|`String`|`false`|-|
|method|-|`String`|`false`|-|
|className|-|`String`|`false`|-|

<!-- @vuese:AwForm:props:end -->





### Slots
Below is a collection of Vue **slots** for the `AwForm` component.
<!-- @vuese:AwForm:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:AwForm:slots:end -->






### Events
Below is a collection of Vue **events** for the `AwForm` component.
<!-- @vuese:AwForm:events:start -->

<!-- @vuese:AwForm:events:end -->
## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Form">
        <AwForm />
    </AwPage>
</template>

<script>
import { AwPage, AwForm } from '@awes-io/ui'

export default {
    name: 'Form',

    components: {
        AwPage,
        AwForm
    }
}
</script>

```

