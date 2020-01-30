# AwPage

## Props

<!-- @vuese:AwPage:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|title|Main headline on the page|`String`|`false`|-|
|titleTag|-|`String`|`false`|-|
|className|-|`String`|`false`|-|
|subnav|Subnavigation for the page|`Array`|`false`|[]|
|breadcrumb|Breadcrumb object with title and href to return back|`Object`|`false`|-|

<!-- @vuese:AwPage:props:end -->

## Slots

<!-- @vuese:AwPage:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|breadcrumb|Breadcrumb link back to catalog|if prop breadctumb is empty, block is empty too|
|title|Title of the page|Empty string|
|buttons|-|-|
|subnav|-|-|
|default|-|-|

<!-- @vuese:AwPage:slots:end -->

