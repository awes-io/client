---
metaTitle: FetchData сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwFetchData /&gt; component is used to render FetchData - UI Vue component for Awes.io.
title: FetchData
---

# AwFetchData

## Props

<!-- @vuese:AwFetchData:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|tag|The tag of parent node|`String`|`false`|div|
|url|request url for fetching data from a server|`String`|`true`|-|
|method|Fetch method|`String`|`false`|GET|
|fetch|Fetch collection immediately when component mounted|`Boolean`|`false`|-|

<!-- @vuese:AwFetchData:props:end -->


## Slots

<!-- @vuese:AwFetchData:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|
|loading|Customization of loading block|Default loading block|
|error|Customization of error|Default error block|

<!-- @vuese:AwFetchData:slots:end -->


## MixIns

<!-- @vuese:AwFetchData:mixIns:start -->
|MixIn|
|---|
|WatchParams|

<!-- @vuese:AwFetchData:mixIns:end -->


