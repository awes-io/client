<template>
    <AwPage title="Modal Windows">
        <AwButton class="m-1" @click="$root.$emit('modal::form:open')">
            Show modal
        </AwButton>
        <AwModal title="Form modal" name="form">
            <template #subtitle>Subtitle</template>
            <AwInput label="Name" name="name" error="Error" />
            <AwInput class="mt-2" label="Password" name="password" />
            <AwButton class="mt-2" type="submit">Submit</AwButton>
        </AwModal>

        <AwButton class="m-1" @click="$root.$emit('modal::fullscreen:open')"
            >Show fullscreen modal</AwButton
        >
        <AwModal title="Fullscreen modal" name="fullscreen" theme="fullscreen">
            <AwInput label="Name" name="name" />
            <AwInput class="mt-2" label="Password" name="password" />
            <AwButton class="mt-2" type="submit">Submit</AwButton>
        </AwModal>

        <AwButton class="m-1" @click="$root.$emit('modal::aside:open')">
            Show aside
        </AwButton>
        <AwModal title="Aside modal" :param="false" name="aside" theme="aside">
            <AwInput label="Name" name="name" />
            <AwInput class="mt-2" label="Password" name="password" />
            <AwSwitcher
                label="Save information for the next booking"
                class="mt-2"
            />
            <AwButton class="mt-2" type="submit">Submit</AwButton>
        </AwModal>

        <AwButton class="m-1" @click="$root.$emit('modal::bottom:open')">
            Show bottom
        </AwButton>
        <AwModal
            title="Bottom modal"
            :param="false"
            name="bottom"
            theme="bottom"
        >
            <AwInput label="Name" name="name" />
            <AwInput class="mt-2" label="Password" name="password" />
            <AwSwitcher
                label="Save information for the next booking"
                class="mt-2"
            />
            <AwButton class="mt-2" type="submit">Submit</AwButton>
        </AwModal>

        <AwButton class="m-1" @click="$root.$emit('modal::buttons:open')">
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
    </AwPage>
</template>

<script>
export default {
    name: 'ModalWindows',

    head() {
        return {
            title: 'AwModal'
        }
    }
}
</script>
