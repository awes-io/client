<template>
    <AwPage title="Dropdowns">
        <h3>Button</h3>
        <AwButton @click="$refs.drop1.toggle()">
            Button drop
        </AwButton>
        <AwDropdown ref="drop1">
            <AwButton theme="toggle" class="block p-4">
                Lorem ipsum dolor sit amet.
            </AwButton>
            <AwButton theme="toggle" class="block p-4">
                Lorem ipsum dolor sit amet.
            </AwButton>
            <AwLink class="text-success block p-4">
                In list button
            </AwLink>
            <AwLink class="block text-error p-4">
                In list button
            </AwLink>
            <AwLink class="block p-4">
                In list button
            </AwLink>
        </AwDropdown>

        <h3>Link</h3>
        <AwLink class="ml-8" @click="$refs.drop2.toggle()">
            Link drop
        </AwLink>
        <AwDropdown ref="drop2">
            <AwGrid :col="1" :gap="2" class="p-4 max-w-xs">
                <AwLink theme="toggle">
                    Lorem ipsum dolor sit amet.
                </AwLink>
                <AwLink theme="toggle">
                    Lorem ipsum dolor sit amet.
                </AwLink>
                <AwLink class="text-success">
                    In list button
                </AwLink>
                <AwLink class="text-error">
                    In list button
                </AwLink>
                <AwLink>
                    In list button
                </AwLink>
            </AwGrid>
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
