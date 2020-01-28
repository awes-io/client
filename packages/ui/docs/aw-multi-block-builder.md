# AwMultiBlockBuilder

Serves for VueMC collection visualization. Pass the collection to `collection` prop, and form fields that you need to default slot. ```vue <AwMultiBlockBuilder title="Manager" :collection="managers">    <template #default="{ model }">      <AwInput         v-model="model.first_name"         :error="model.errors.first_name"         label="First name"       />    </template>  </AwMultiBlockBuilder> ```

## Props

<!-- @vuese:AwMultiBlockBuilder:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|collection|VueMC collection object|`Object`|`true`|-|
|title|Title, added to block heading and buttons|`String`|`false`|-|
|max|Max number of items, the add button hides if value is reached|`Number`|`false`|-|

<!-- @vuese:AwMultiBlockBuilder:props:end -->





## Events

<!-- @vuese:AwMultiBlockBuilder:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|add:model|Fire when model is added|`collection`, passed to props|
|remove:model|Fire when model is removed|`collection`, passed to props|
|fetch:collection|Fire on collection fetch|1.`collection`, passed to props 2. VueMC event object|
|save:collection|Fire on collection save|1.`collection`, passed to props 2. VueMC event object|

<!-- @vuese:AwMultiBlockBuilder:events:end -->





## Slots

<!-- @vuese:AwMultiBlockBuilder:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|title|block title|`<h5>{title} #{iteration} <button>Remove {title}</button></h5>`|
|default|block content|-|
|add|-|`<button>+ Add {title}</button>`|
|save|save button|`<button>Save</button>`|

<!-- @vuese:AwMultiBlockBuilder:slots:end -->





## Methods

<!-- @vuese:AwMultiBlockBuilder:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|add|Add new model and emit `add:model` event|-|
|remove|Remove model and emit `remove:model` event|The model object, required|

<!-- @vuese:AwMultiBlockBuilder:methods:end -->





