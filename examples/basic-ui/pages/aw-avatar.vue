<template>
    <AwPage :title="headline">
        <h6>With name</h6>
        <AwAvatar name="Max Mustermann jr." :size="50" />

        <AwCodeSnippet v-text="codeName" class="mt-3" />

        <h6>With image</h6>
        <AwAvatar
            :size="50"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        />
        <AwCodeSnippet v-text="codeImage" class="mt-3" :size="50" />

        <h6>In sizes</h6>

        <p>You can set any size you want with size prop</p>

        <AwGrid :col="{ md: 6 }">
            <AwAvatar name="Max Mustermann jr." :size="36" />
            <AwAvatar name="Max Mustermann jr." :size="46" />
            <AwAvatar name="Max Mustermann jr." :size="56" />
            <AwAvatar
                :size="70"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            />
        </AwGrid>

        <AwCodeSnippet v-text="codeSize" class="mt-3" />

        <h6>Different types of rendered img</h6>

        <AwGrid :col="{ md: 6 }">
            <AwAvatar name="Max Mustermann jr." type="no-img" :size="50" />
            <AwAvatar name="Max Mustermann jr." type="initials" :size="50" />
            <AwAvatar name="Max Mustermann jr." type="empty" :size="50" />
        </AwGrid>

        <AwCodeSnippet v-text="codeImg" class="mt-3" />

        <h6>Colored background</h6>

        <AwGrid :col="{ md: 6 }">
            <AwAvatar name="Max Mustermann jr." :isColored="true" :size="50" />
            <AwAvatar name="Max Mustermann jr." :isColored="false" :size="50" />
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
            codeImage: '<AwAvatar src="image url here" />'
        }
    },

    computed: {
        codeSize() {
            const arr = [
                '<AwAvatar name="Max Mustermann jr." :size="36" />',
                '',
                '<AwAvatar name="Max Mustermann jr." :size="48" />',
                '',
                '<AwAvatar name="Max Mustermann jr." :size="53" />',
                '',
                '<AwAvatar :size="70" src="image url here" />'
            ]
            return arr.join('\n')
        },

        codeImg() {
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
                '<AwAvatar name="Max Mustermann jr." :isColored="true" />',
                '',
                '<AwAvatar name="Max Mustermann jr." :isColored="false" />'
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
