<template>
    <AwGrid :col="{ lg: 2 }">
        <AwGrid>
            <AwInput
                :label="$t('AwesIoNuxtAdmin.role_name')"
                v-model="model.name"
                name="name"
                :error="model.errors.name"
            />
            <AwInput
                v-model="model.priority"
                :label="$t('AwesIoNuxtAdmin.priority')"
                name="priority"
                :error="model.errors.priority"
                type="number"
                placeholder="0"
            />
            <AwTextarea
                v-model="model.description"
                :label="$t('AwesIoNuxtAdmin.description')"
                name="description"
                :error="model.errors.description"
            />
            <AwInfo :label="$t('AwesIoNuxtAdmin.default_role_title')">
                <AwSwitcher
                    v-model="model.default_new"
                    :label="$t('AwesIoNuxtAdmin.default_role')"
                />
            </AwInfo>
            <AwButton
                class="mt-5"
                @click="updateRole"
                :loading="model.saving"
                :disabled="!model.changed()"
            >
                {{ $t('AwesIoNuxtAdmin.update') }}
            </AwButton>
        </AwGrid>
    </AwGrid>
</template>

<script>
import redirectToRoles from '@awes-io/nuxt-admin/src/mixins/redirectToRoles'

export default {
    name: 'RoleUpdateInformation',

    props: ['model'],

    mixins: [redirectToRoles],

    methods: {
        async updateRole() {
            try {
                await this.model.save()
                this.redirectToRoles()
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
