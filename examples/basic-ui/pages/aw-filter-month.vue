<template>
    <AwPage :title="headline">
        <AwFilterMonth :min="new Date()" label="Date" />
    </AwPage>
</template>

<script>
import dayjs from 'dayjs'

export default {
    name: 'aw-filter-month',

    data() {
        return {
            title: 'AwFilterMonth',
            headline: this._getTitle('AwFilterMonth'),
            min: dayjs()
        }
    }
}
</script>

<style></style>
