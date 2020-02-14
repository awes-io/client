<template>
    <AwPage title="Dropdowns">
        <h3>Button</h3>

        <AwButton @click="$refs.drop1.toggle()">
            Button drop
        </AwButton>
        <AwDropdown ref="drop1">
            <AwDropdownButton>
                Default
            </AwDropdownButton>
            <AwDropdownButton color="success">
                Seccess
            </AwDropdownButton>
            <AwDropdownButton color="warning">
                Warning
            </AwDropdownButton>
            <AwDropdownButton color="error">
                Danger
            </AwDropdownButton>
            <AwDropdownButton active>
                Default active
            </AwDropdownButton>
            <AwDropdownButton color="success" active>
                Seccess active
            </AwDropdownButton>
            <AwDropdownButton color="warning" active>
                Warning active
            </AwDropdownButton>
            <AwDropdownButton color="error" active>
                Danger active
            </AwDropdownButton>
        </AwDropdown>

        <h4>Text below</h4>

        <p class="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo
            doloribus, vitae perspiciatis, vel eveniet ullam culpa pariatur
            excepturi beatae repudiandae non veniam quia sint voluptate nam
            earum quis, ab a voluptates mollitia, expedita similique error odit
            numquam! Molestiae recusandae, labore.
        </p>
    </AwPage>
</template>

<script>
export default {
    head() {
        return {
            title: 'AwDropdown'
        }
    }
}
</script>
