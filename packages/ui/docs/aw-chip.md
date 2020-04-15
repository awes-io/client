---
metaTitle: Chip сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwChip /&gt; component is used to render Chip - UI Vue component for Awes.io.
title: Chip
---
# Chip

The `AwChip` component is used to render Chip.


## Usage
Several examples how you can use `AwChip`.


### Live Example
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-chip&module=%2Fpages%2Faw-chip.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwChip` component.
<!-- @vuese:AwChip:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|icon|Icon name to render in decor element|`String`|`false`|-|
|text|Text label|`String`|`false`|-|
|color|Border, icon and close icon color|`String`|`false`|-|
|image|Decor element background|`String`|`false`|-|
|loading|Toggles loading animation|`Boolean`|`false`|-|
|filled|Indicates if chip has filled background|`Boolean`|`false`|-|

<!-- @vuese:AwChip:props:end -->

### Slots
Below is a collection of Vue **slots** for the `AwChip` component.
<!-- @vuese:AwChip:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|left|On the left side of text|decor element|
|center|text wrap|<span class="aw-chip__text">{{ text }}</span>|
|default|text|value of text prop|
|right|On the right side of text|-|

<!-- @vuese:AwChip:slots:end -->