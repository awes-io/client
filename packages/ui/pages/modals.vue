<template>
    <AwPage title="Modal Windows">
        <AwButton @click="$root.$emit('modal::form:open')">Show modal</AwButton>
        <AwModal title="Form modal" name="form">
            <AwInput label="Name" name="name" />
            <AwInput class="mt-2" label="Password" name="password" />
            <AwButton class="mt-2" type="submit">Submit</AwButton>
        </AwModal>

        <AwButton @click="$root.$emit('modal::fullscreen:open')"
            >Show fullscreen modal</AwButton
        >
        <AwModal title="Fullscreen modal" name="fullscreen" theme="fullscreen">
            <AwInput label="Name" name="name" />
            <AwInput class="mt-2" label="Password" name="password" />
            <AwButton class="mt-2" type="submit">Submit</AwButton>
        </AwModal>

        <AwButton @click="$root.$emit('modal::aside:open')">
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

        <AwButton @click="$root.$emit('modal::bottom:open')">
            Show bottom
        </AwButton>
        <AwModal title="Bottom modal" :param="false" name="bottom" theme="bottom">
            <AwInput label="Name" name="name" />
            <AwInput class="mt-2" label="Password" name="password" />
            <AwSwitcher
                label="Save information for the next booking"
                class="mt-2"
            />
            <AwButton class="mt-2" type="submit">Submit</AwButton>
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
