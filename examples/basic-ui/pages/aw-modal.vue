<template>
    <AwPage :title="headline">
        <AwButton @click="$root.$emit('modal::form:open')">Show modal</AwButton>
        <AwModal title="Form modal" name="form">
            <template #subtitle>Subtitle</template>
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
        <AwModal title="Aside modal" param="drawer" name="aside" theme="aside">
            <blockquote>
                <p>
                    This modal has another param, because
                    <code>param</code> prop is <code>drawer</code>
                </p>
            </blockquote>
        </AwModal>

        <AwButton @click="$root.$emit('modal::bottom:open')">
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

    head() {
        return {
            title: this._getMetaTitle(this.title),
            meta: [this._getMetaDescription(this.title)]
        }
    }
}
</script>
