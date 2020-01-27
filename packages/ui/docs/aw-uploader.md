---
metaTitle: Uploader сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwUploader /&gt; component is used to render Uploader - UI Vue component for Awes.io.
title: Uploader
---
# Uploader

The `AwUploader` component is used to render Uploader.

::: tip Content
[[toc]]
:::

## Usage
Several examples how you can use `AwUploader`.

### Preview
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-uploader&module=%2Fpages%2Faw-uploader.vue&theme=dark&view=preview'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Editor
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-uploader&module=%2Fpages%2Faw-uploader.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwUploader` component.
<!-- @vuese:AwUploader:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|url|-|`String`|`true`|-|
|name|-|`String`|`false`|-|
|format|-|`Array`|`false`|[]|
|max|-|`Number`|`false`|2|
|getFileId|-|`Function`|`false`|-|
|multiple|-|`Boolean`|`false`|-|

<!-- @vuese:AwUploader:props:end -->


### Slots
Below is a collection of Vue **slots** for the `AwUploader` component.
<!-- @vuese:AwUploader:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|drag-over|-|-|
|file-list|file list|-|

<!-- @vuese:AwUploader:slots:end -->



### Events
Below is a collection of Vue **events** for the `AwUploader` component.
<!-- @vuese:AwUploader:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|error|-|-|

<!-- @vuese:AwUploader:events:end -->



## Examples
Below is a collection of simple to complex examples.

### Basic usage without props
```vue
<template>
    <AwPage title="Uploader">
        <AwUploader />
    </AwPage>
</template>

<script>
import { AwPage, AwUploader } from '@awes-io/ui'

export default {
    name: 'Uploader',

    components: {
        AwPage,
        AwUploader
    }
}
</script>

```

