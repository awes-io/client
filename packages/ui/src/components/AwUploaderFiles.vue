<template functional>
    <AwTable
        v-if="props.files.length"
        :rows="props.files"
        class="table-fixed"
        :class="[data.class, data.staticClass]"
        :style="[data.style, data.staticStyle]"
    >
        <template #thead>
            <thead></thead>
        </template>
        <AwTableCol vertical-align="middle" class="text-center w-1/6">
            <template #default="{ index }">{{ index + 1 }}</template>
        </AwTableCol>
        <AwTableCol field="name" class="truncate" vertical-align="middle" />
        <AwTableCol
            class="hidden md:table-cell text-center"
            vertical-align="middle"
        >
            <template #default="{ cell: file }">
                {{
                    file.loaded
                        ? parent.$t('AwUploader.loaded')
                        : `${file.progress}%`
                }}
            </template>
        </AwTableCol>
        <AwTableCol vertical-align="middle" class="text-center w-1/6">
            <template #default="{ cell: file }">
                <AwButton
                    theme="icon"
                    icon="close"
                    size="sm"
                    :text="parent.$t('AwUploader.remove')"
                    @click="props.removeFile(file.id)"
                />
            </template>
        </AwTableCol>
    </AwTable>
</template>

<script>
export default {
    name: 'AwUploaderFiles',

    props: {
        files: {
            type: Array,
            default: () => []
        },

        removeFile: {
            type: Function,
            required: true
        }
    }
}
</script>
