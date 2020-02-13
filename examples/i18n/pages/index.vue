<template>
    <div class="container">
        <div>
            <NLink
                v-for="{ code, iso } in $i18n.locales"
                :key="code"
                :to="switchLocalePath(code)"
                target="_self"
            >
                {{ iso }}
            </NLink>
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
