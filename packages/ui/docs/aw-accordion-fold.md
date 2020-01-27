---
metaTitle: Accordion fold сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwAccordionFold /&gt; component is used to render Accordion fold - UI Vue component for Awes.io.
title: Accordion fold
---
# Accordion fold

The `AwAccordionFold` component is used to render Accordion fold.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwAccordionFold`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-accordion-fold&module=%2Fpages%2Faw-accordion-fold.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-accordion-fold&module=%2Fpages%2Faw-accordion-fold.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwAccordionFold` component.
<!-- @vuese:AwAccordionFold:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|show|-|`Boolean`|`false`|-|
|tag|-|`String`|`false`|div|

<!-- @vuese:AwAccordionFold:props:end -->


### Slots
Below is a collection of Vue **slots** for the `AwAccordionFold` component.
<!-- @vuese:AwAccordionFold:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:AwAccordionFold:slots:end -->



## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Accordion fold">
        <AwAccordionFold />
    </AwPage>
</template>

<script>
import { AwPage, AwAccordionFold } from '@awes-io/ui'

export default {
    name: 'Accordion fold',

    components: {
        AwPage,
        AwAccordionFold
    }
}
</script>

```
