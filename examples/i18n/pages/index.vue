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

        <AwDisplayDate
            date="12.09.1995"
            full-parse-format="DD.MM.YYYY"
            short-parse-format="DD.MM"
            full-display-format="ll"
            class="block mt-4"
        />

        <div class="mt-4">
            <AwFilterMonth display-format="MMMM YYYY" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Homepage'
}
</script>
