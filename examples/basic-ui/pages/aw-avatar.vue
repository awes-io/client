<template>
    <AwPage :title="headline">
        <h3>With name</h3>
        <AwAvatar name="Max Mustermann jr." :size="50" />

        <AwCodeSnippet v-text="codeName" class="mt-3" />

        <h3>With image</h3>
        <AwAvatar
            :size="50"
            :src="require('@/assets/img/avatar_placeholder.png')"
        />
        <AwCodeSnippet v-text="codeImage" class="mt-3" :size="50" />

        <h3>In sizes</h3>

        <p>You can set any size you want with size prop</p>

        <AwGrid :col="{ md: 6 }">
            <div>
                <AwAvatar name="Max Mustermann jr." :size="20" />
                <AwAvatar name="Max Mustermann jr." type="no-img" :size="20" />
            </div>

            <div>
                <AwAvatar name="Mario Speedwagon" :size="30" />
                <AwAvatar name="Mario Speedwagon" type="no-img" :size="30" />
            </div>

            <div>
                <AwAvatar name="🥺 Petey Cruiser" :size="40" />
                <AwAvatar name="Petey Cruiser" type="no-img" :size="40" />
            </div>

            <div>
                <AwAvatar
                    :size="50"
                    :src="require('@/assets/img/avatar_placeholder.png')"
                />
                <AwAvatar name="Petey Cruiser" type="no-img" size="50" />
            </div>
        </AwGrid>

        <AwCodeSnippet v-text="codeSize" class="mt-3" />

        <h6>Try sizes in action</h6>

        <AwInput type="number" v-model="currentSize" class="my-2" />

        <AwAvatar name="Petey Cruiser" :size="currentSize" />
        <AwAvatar name="Petey Cruiser" type="no-img" :size="currentSize" />
        <AwAvatar
            :src="require('@/assets/img/avatar_placeholder.png')"
            :size="currentSize"
        />

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
            codeImage: '\n\n<AwAvatar src="image url here" />',
            currentSize: 30
        }
    },

    computed: {
        codeSize() {
            const arr = [
                '<AwAvatar name="Max Mustermann jr." :size="20" />',
                '\n<AwAvatar name="Mario Speedwagon" :size="30" />',
                '\n<AwAvatar name="🥺 Petey Cruiser" :size="40" />',
                '\n<AwAvatar :size="50" src="image url here" />'
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
