<template>
    <div>
        <h2>Calendar</h2>
        <AwCalendar />

        <h2>Date input</h2>
        <AwForm>
            <AwDate
                name="date"
                :min="new Date().setDate(20)"
                :max="new Date().setDate(25)"
                :value="new Date()"
            />
        </AwForm>
    </div>
</template>
