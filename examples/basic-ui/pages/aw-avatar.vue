<template>
    <AwPage :title="headline">
        <h3>With name</h3>
        <AwAvatar name="Max Mustermann jr." :size="50" />

        <AwCodeSnippet v-text="codeName" class="mt-3" />

        <h3>With image</h3>
        <AwAvatar
            :size="50"
            src="https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple.jpg"
        />
        <AwCodeSnippet v-text="codeImage" class="mt-3" :size="50" />

        <h3>In sizes</h3>

        <p>You can set any size you want with size prop</p>

        <AwGrid :col="{ md: 6 }">
            <AwAvatar name="Max Mustermann jr." :size="36" />
            <AwAvatar name="Mario Speedwagon" :size="46" />
            <AwAvatar name="Petey Cruiser" :size="56" />
            <AwAvatar
                :size="70"
                src="https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple.jpg"
            />
        </AwGrid>

        <AwCodeSnippet v-text="codeSize" class="mt-3" />

        <h3>Different types of rendered img</h3>

        <AwGrid :col="{ md: 6 }">
            <AwAvatar name="Max Mustermann jr." type="no-img" :size="50" />
            <AwAvatar name="Mario Speedwagon" type="initials" :size="50" />
            <AwAvatar name="Petey Cruiser" type="empty" :size="50" />
        </AwGrid>

        <AwCodeSnippet v-text="codeRenderedImg" class="mt-3" />

        <h3>Colored background</h3>

        <AwGrid :col="{ md: 6 }">
            <AwAvatar name="Mario Speedwagon" :isColored="true" :size="50" />
            <AwAvatar name="Mario Speedwagon" :isColored="false" :size="50" />
        </AwGrid>

        <AwCodeSnippet v-text="codeColor" class="mt-3" />
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwAvatar',
            headline: this._getTitle('AwAvatar'),
            codeName: '<AwAvatar name="Max Mustermann jr." />',
            codeImage:
                '\n\n<AwAvatar src="https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple.jpg" />'
        }
    },

    computed: {
        codeSize() {
            const arr = [
                '<AwAvatar name="Max Mustermann jr." :size="36" />',
                '',
                '<AwAvatar name="Mario Speedwagon" :size="48" />',
                '',
                '<AwAvatar name="Petey Cruiser" :size="53" />',
                '',
                '<AwAvatar :size="70" src="https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple.jpg" />'
            ]
            return arr.join('\n')
        },

        codeRenderedImg() {
            const arr = [
                '<AwAvatar name="Max Mustermann jr." type="no-img" :size="50" />',
                '',
                '<AwAvatar name="Max Mustermann jr." type="initials" :size="50" />',
                '',
                '<AwAvatar name="Max Mustermann jr." type="empty" :size="50" />'
            ]
            return arr.join('\n')
        },

        codeColor() {
            const arr = [
                '<AwAvatar name="Mario Speedwagon" :isColored="true" />',
                '',
                '<AwAvatar name="Mario Speedwagon" :isColored="false" />'
            ]
            return arr.join('\n')
        }
    },

    head() {
        return {
            title: this._getMetaTitle(this.title),
            meta: [this._getMetaDescription(this.title)]
        }
    }
}
</script>
