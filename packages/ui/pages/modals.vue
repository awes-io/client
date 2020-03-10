<template>
    <AwPage title="Modal Windows">
        <AwButton class="m-1" @click="$root.$emit('modal::form:open')">
            Show modal
        </AwButton>
        <AwModal title="Form modal" name="form">
            <template #subtitle>Subtitle</template>
            <AwInput label="Name" name="name" error="Error" />
            <AwInput class="mt-2" label="Password" name="password" />

            <div class="mt-8">
                <AwButton size="lg" class="w-full md:w-auto mb-1 md:mb-0">
                    Apply
                </AwButton>
                <AwButton
                    color="default"
                    theme="ghost"
                    size="lg"
                    class="w-full md:w-auto"
                >
                    Cancel
                </AwButton>
            </div>
        </AwModal>

        <AwButton class="m-1" @click="$root.$emit('modal::fullscreen:open')"
            >Show fullscreen modal</AwButton
        >
        <AwModal title="Fullscreen modal" name="fullscreen" theme="fullscreen">
            <template #subtitle>Subtitle</template>
            <AwInput label="Name" name="name" />
            <AwInput class="mt-2" label="Password" name="password" />
            <AwButton class="mt-2" type="submit">Submit</AwButton>
        </AwModal>

        <AwButton class="m-1" @click="$root.$emit('modal::aside:open')">
            Show aside
        </AwButton>
        <AwModal title="Aside modal" :param="false" name="aside" theme="aside">
            <template #subtitle>Subtitle</template>
            <AwInput label="Name" name="name" />
            <AwInput class="mt-2" label="Password" name="password" />

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
            <template #subtitle>Subtitle</template>

            <div style="max-height: 210px; overflow: auto" class="bg-muted p-4">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Expedita quo reiciendis rerum corrupti architecto vero sed
                accusantium dolores nisi quod itaque asperiores nobis a ad
                consequuntur corporis, suscipit minus vitae? Lorem ipsum dolor,
                sit amet consectetur adipisicing elit. Expedita quo reiciendis
                rerum corrupti architecto vero sed accusantium dolores nisi quod
                itaque asperiores nobis a ad consequuntur corporis, suscipit
                minus vitae? Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Expedita quo reiciendis rerum corrupti architecto vero sed
                accusantium dolores nisi quod itaque asperiores nobis a ad
                consequuntur corporis, suscipit minus vitae? Lorem ipsum dolor,
                sit amet consectetur adipisicing elit. Expedita quo reiciendis
                rerum corrupti architecto vero Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Expedita quo reiciendis rerum
                corrupti architecto vero sed accusantium dolores nisi quod
                itaque asperiores nobis a ad consequuntur corporis, suscipit
                minus vitae? Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Expedita quo reiciendis rerum corrupti architecto vero sed
                accusantium dolores nisi quod itaque asperiores nobis a ad
                consequuntur corporis, suscipit minus vitae? Lorem ipsum dolor,
                sit amet consectetur adipisicing elit. Expedita quo reiciendis
                rerum corrupti architecto vero sed accusantium dolores nisi quod
                itaque asperiores nobis a ad consequuntur corporis, suscipit
                minus vitae? Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Expedita quo reiciendis rerum corrupti architecto vero
            </div>

            <AwButton class="hidden md:block mt-8" size="lg">
                Save
            </AwButton>

            <template #buttons>
                <div class="px-4 pt-4 bg-surface flex-1 md:hidden">
                    <AwButton class="w-full" size="lg">
                        Save
                    </AwButton>
                </div>
            </template>
        </AwModal>

        <AwButton class="m-1" @click="$root.$emit('modal::buttons:open')">
            Show Bottom buttons
        </AwButton>
        <AwModal title="Buttons modal" name="buttons">
            <template #subtitle>Subtitle</template>
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
