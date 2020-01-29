# AwTableBuilder

## Props

<!-- @vuese:AwTableBuilder:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|collection|-|`Object`|`true`|-|
|pageParam|-|`String`|`false`|page|
|limitParam|-|`String`|`false`|limit|
|limits|-|`Array`|`false`|-|
|scrollOnPage|-|`Boolean`|`false`|-|
|verticalAlign|-|`String`|`false`|-|
|defaultHeight|Size of the empty block, e.g loading block or empty block.|`String`|`false`|50vh|

<!-- @vuese:AwTableBuilder:props:end -->

## Slots

<!-- @vuese:AwTableBuilder:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|empty-container|Empty container, your can compleatly overwrite the block.|Block with icon, headline and slot for button.|
|empty-icon|Icon customization. Leave empty if you would like to remove.|Empty SVG icon|
|empty-title|Headline customization in the empty block|Text: "There are no data to show"|
|empty-button|You can use the slot to add a button or else|`Empty`|
|default|-|-|
|empty-loading-container|Empty loading container|Empty AwCard block|
|loading|Customization of loading block|Default loading block|

<!-- @vuese:AwTableBuilder:slots:end -->

