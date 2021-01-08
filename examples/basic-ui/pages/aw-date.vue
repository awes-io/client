<template>
    <AwPage :title="headline">
        <h2>Calendar</h2>
        <AwCalendar />

        <h2>Date input</h2>
        <AwForm>
            <AwDate
                name="date"
                v-model="date"
                :min="new Date().setDate(20)"
                :max="new Date().setDate(25)"
            />
        </AwForm>

        <h2>Prefix / Postfix</h2>
        <AwDate name="date" v-model="datePrefix" :min="new Date()">
            <template #prefix>
                <AwIcon name="duotone/gift" class="mx-4" />
            </template>
        </AwDate>

        <AwDate
            name="date"
            v-model="datePostfix"
            :min="new Date()"
            class="mt-4"
        >
            <template #postfix>
                <AwIcon name="duotone/life-ring" class="mx-4" />
            </template>
        </AwDate>

        <h2>Clearable</h2>
        <AwDate name="date" v-model="dateClearable" clearable />
    </AwPage>
</template>

<script>
export default {
    name: 'FormsCalendarPage',

    data() {
        return {
            title: 'AwCalendar',
            headline: this._getTitle('AwCalendar'),
            date: new Date(),
            datePrefix: new Date(),
            datePostfix: new Date(),
            dateClearable: new Date()
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
