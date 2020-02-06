<template>
    <div class="container">
        <div>
            <AwLink
                v-for="{ code } in $i18n.locales"
                :key="code"
                :href="switchLocalePath(code)"
                target="_self"
            >
                {{ code }}
            </AwLink>
        </div>
        <strong>Test:</strong> {{ $t('passwords.reset') }}
        <br />
        <strong>Dayjs:</strong> {{ $dayjs(new Date()).format('LL') }}
    </div>
</template>

<script>
export default {
    name: 'Homepage'
}
</script>
