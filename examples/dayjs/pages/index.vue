<template>
    <AwPage title="Dayjs example">
        <div class="mb-4">
            <AwLink
                v-for="{ name, code } in $i18n.locales"
                :key="code"
                :href="switchLocalePath(code)"
            >
                {{ name }}
            </AwLink>
        </div>
        <p class="text-lg my-4">
            {{ $dayjs(new Date()).format() }}
        </p>
        <p class="text-lg my-4">
            {{ $dayjs('2020-02-04', 'YYYY-MM-DD').format('LL') }}
        </p>
        <p class="text-lg my-4">
            {{ $dayjs('2020-02-04T13:00:00+0200').format('LLLL') }}
        </p>
        <p class="text-lg my-4">
            {{
                $dayjs(new Date())
                    .subtract(2, 'day')
                    .fromNow()
            }}
        </p>
        <!-- <p class="text-lg my-4">locale: {{ $dayjs.locale() }}</p> -->
    </AwPage>
</template>

<script>
export default {
    name: 'Homepage'
}
</script>
