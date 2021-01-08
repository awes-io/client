<template>
    <div class="container">
        <div>
            <button
                v-for="{ code, iso } in $i18n.locales"
                :key="code"
                @click="$i18n.setLocale(code)"
            >
                {{ iso }}
            </button>
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
