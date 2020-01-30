# AwUserpic

## Props

<!-- @vuese:AwUserpic:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|src|Full URL to the picture|`String`|`false`|-|
|name|User name|`String`|`false`|-|
|hideName|It's hide the user name. The size of the image will be bigger.|`Boolean`|`false`|-|
<!-- @vuese:AwUserpic:props:end -->


## Examples
Below is a collection of simple to complex examples.

### Basic usage
```vue
<template>
    <AwPage title="AwUserpic">
        <!-- View for tables, small picture with user name. -->
        <AwUserpic src="https://picsum.photos/72" name="Max Mustermann" />
        <!-- View for tables, large picture without user name. -->
        <AwUserpic src="https://picsum.photos/72" name="Max Mustermann" hide-name />
    </AwPage>
</template>

<script>
import { AwPage, AwUserpic } from '@awes-io/ui'

export default {
    name: 'AwUserpic',

    components: {
        AwPage,
        AwUserpic
    }
}
</script>

```