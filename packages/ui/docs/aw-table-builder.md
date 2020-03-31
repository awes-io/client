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
|infiniteScroll|Indicates if infinity scroll enabled|`Boolean`|`false`|-|
|mixed|If true enable both pagination and infinity scroll|`Boolean`|`false`|-|
|defaultHeight|Size of the empty block, e.g loading block or empty block.|`String`|`false`|50vh|
|arrowNav|Should the page being switched on `CTRL + <-` and  `CTRL + ->`|`Boolean`|`false`|-|
|orderable|Orderable config that will be merged with global orderable config. If null then global orderable config will be used|`Object`|`false`|-|

<!-- @vuese:AwTableBuilder:props:end -->

## Slots

<!-- @vuese:AwTableBuilder:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|empty-container|The empty container. Will be shown if the data (without filters) is empty. Your can compleatly overwrite the block.|Block with icon, headline and slot for button.|
|empty-icon|Icon customization. Leave empty if you would like to remove.|Empty SVG icon|
|empty-title|Headline customization in the empty block|Text: "There are no data to show"|
|empty-button|You can use the slot to add a button or else|`Empty`|
|empty-filter-container|The empty container if filtered response is empty. Your can compleatly overwrite the block. Shows when watch params is present un url|Block with icon, headline and slot for button.|
|empty-filter-icon|Icon customization. Leave empty if you would like to remove.|Empty SVG icon|
|empty-filter-title|Headline customization in the empty filter block|Text: "There are no data to show"|
|empty-filter-button|You can use the slot to add a button or else|`Empty`|
|list|-|-|
|default|-|-|
|empty-loading-container|Empty loading container|Empty AwCard block|
|loading|Customization of loading block|Default loading block|

<!-- @vuese:AwTableBuilder:slots:end -->


## Events
<!-- @vuese:AwTableBuilder:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|`TABLE_HEAD_CLICK_EVENT`|-|-|

<!-- @vuese:AwTableBuilder:events:end -->
                            