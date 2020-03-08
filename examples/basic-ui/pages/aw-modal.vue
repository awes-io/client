<template>
    <AwPage :title="headline">
        <AwButton @click="$root.$emit('modal::form:open')" class="m-1">
            Show modal
        </AwButton>
        <AwModal title="Form modal" name="form">
            <template #subtitle>Subtitle</template>
            <AwInput label="Name" name="name" />
            <AwInput class="mt-2" label="Password" name="password" />
            <AwButton class="mt-2" type="submit">Submit</AwButton>
        </AwModal>

        <AwButton @click="$root.$emit('modal::fullscreen:open')" class="m-1">
            Show fullscreen modal
        </AwButton>
        <AwModal title="Fullscreen modal" name="fullscreen" theme="fullscreen">
            <AwInput label="Name" name="name" />
            <AwInput class="mt-2" label="Password" name="password" />
            <AwButton class="mt-2" type="submit">Submit</AwButton>
        </AwModal>

        <AwButton @click="$root.$emit('modal::aside:open')" class="m-1">
            Show aside
        </AwButton>
        <AwModal title="Aside modal" param="drawer" name="aside" theme="aside">
            <blockquote>
                <p>
                    This modal has another param, because
                    <code>param</code> prop is <code>drawer</code>
                </p>
            </blockquote>
        </AwModal>

        <AwButton @click="$root.$emit('modal::bottom:open')" class="m-1">
            Show bottom
        </AwButton>
        <AwModal
            title="No GET-param for this modal"
            :param="false"
            name="bottom"
            theme="bottom"
        >
            <blockquote>
                <p>
                    This modal state is not saved to get parameters, because
                    <code>:param</code> is <code>false</code>
                </p>
            </blockquote>
        </AwModal>

        <section class="mt-8">
            <h3>Buttons slot</h3>

            <AwButton @click="$root.$emit('modal::buttons:open')">
                Show Bottom buttons
            </AwButton>
            <AwModal title="Buttons modal" name="buttons">
                <AwInput label="Name" name="name" />
                <AwInput class="mt-2" label="Password" name="password" />

                <template #buttons>
                    <AwButton class="rounded-none flex-1" size="lg">
                        Save
                    </AwButton>
                    <AwButton
                        class="rounded-none flex-1 border-t-1 border-muted-darker"
                        content-class="text-grey"
                        size="lg"
                        color="default"
                        theme="ghost"
                    >
                        Cancel
                    </AwButton>
                </template>
            </AwModal>

            <AwCodeSnippet v-text="buttonsCode" class="my-3" />
        </section>
    </AwPage>
</template>

<script>
export default {
    name: 'ModalWindows',

    data() {
        return {
            title: 'AwModal',
            headline: this._getTitle('AwModal')
        }
    },

    computed: {
        buttonsCode() {
            const arr = [
                '<AwButton @click="$root.$emit(\'modal::buttons:open\')">',
                '    Show Bottom buttons',
                '</AwButton>',
                '<AwModal title="Buttons modal" name="buttons">',
                '    <AwInput label="Name" name="name" />',
                '    <AwInput class="mt-2" label="Password" name="password" />',
                '',
                '    <template #buttons>',
                '        <AwButton class="rounded-none flex-1" size="lg">',
                '            Save',
                '        </AwButton>',
                '        <AwButton',
                '            class="rounded-none flex-1 border-t-1 border-muted-darker"',
                '            content-class="text-grey"',
                '            size="lg"',
                '            color="default"',
                '            theme="ghost"',
                '        >',
                '            Cancel',
                '        </AwButton>',
                '    </template>',
                '</AwModal>'
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
