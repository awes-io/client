# Grid component

## Property: `col`, Object

Responsive breakpoints are based on `tailwindconfig.js` screens

### Usage examples

```html

<AwGrid col="{default: 2}">
    <!-- default: 2, md:2, lg: 2, xl: 2 -->
</AwGrid>


<AwGrid col="{default: 2, lg: 3}">
    <!-- default: 2, md:2, lg: 3, xl: 3 -->
</AwGrid>


<AwGrid col="{md: 2, lg: 3, xl: 4}">
    <!-- default: 1, md:2, lg: 3, xl: 4 -->
</AwGrid>


<AwGrid col="{md: 2}">
    <!-- default: 1, md:2, lg: 2, xl: 2 -->
</AwGrid>


<AwGrid col="{lg: 2}">
    <!-- default: 1, md:1, lg: 2, xl: 2 -->
</AwGrid>


<AwGrid col="{xl: 2}">
    <!-- default: 1, md:1, lg: 1, xl: 2 -->
</AwGrid>

```


## Property: `gap`, Number, Default: 4

Grid gaps are based on `tailwindconfig.js` spacing

```html

<AwGrid gap="2">
    <AwInput>
    <AwInput>
    <AwInput>
    <AwInput>
</AwGrid>

```
