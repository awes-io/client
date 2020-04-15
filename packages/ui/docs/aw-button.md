---
metaTitle: Button сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwButton /&gt; component is used to render Button - UI Vue component for Awes.io.
title: Button
---
# Button

The `AwButton` component is used to render Button.


## Usage
Several examples how you can use `AwButton`.

### Live Example
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-button&module=%2Fpages%2Faw-button.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwButton` component.
<!-- @vuese:AwButton:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|size|Possible values: 'sm', 'md', 'lg'|`String`|`false`|-|
|color|Background color of button. Possible values: 'info', 'success', 'warning', 'error'|`String`|`false`|-|
|theme|Possible values: outline, ghost|`String`|`false`|-|
|icon|Name of icon in button. Icon placed before text|`String`|`false`|-|
|loading|Indicates if loader spinner is shown|`Boolean` /  `String`|`false`|-|
|contentClass|CSS class for content wrapper|`String`|`false`|-|
|active|Active state|`Boolean`|`false`|-|

<!-- @vuese:AwButton:props:end -->

### Slots
Below is a collection of Vue **slots** for the `AwButton` component.
<!-- @vuese:AwButton:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:AwButton:slots:end -->
