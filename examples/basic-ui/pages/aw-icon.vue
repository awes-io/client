<template>
    <AwPage title="Icons">
        <AwGrid :col="{ md: 2 }">
            <div
                class="p-4 border text-center"
                v-for="name in $options.iconNames"
                :key="name"
            >
                <code>&lt;AwIcon name="{{ name }}" /&gt;</code> <br />
                <AwIcon :name="name" class="mt-4 mx-auto" size="32" />
            </div>
        </AwGrid>
    </AwPage>
</template>

<script>
const iconNames = [
    'duotone/align-justify.svg',
    'duotone/analytics.svg',
    'duotone/browser.svg',
    'duotone/calendar-alt.svg',
    'duotone/chart-network.svg',
    'duotone/check-circle.svg',
    'duotone/clipboard-list-check.svg',
    'duotone/clock.svg',
    'duotone/cog.svg',
    'duotone/concierge-bell.svg',
    'duotone/credit-card.svg',
    'duotone/envelope-open-dollar.svg',
    'duotone/gift.svg',
    'duotone/gifts.svg',
    'duotone/images.svg',
    'duotone/life-ring.svg',
    'duotone/list-alt.svg',
    'duotone/map-marker-check.svg',
    'duotone/mobile.svg',
    'duotone/palette.svg',
    'duotone/question-square.svg',
    'duotone/university.svg',
    'duotone/user-crown.svg',
    'duotone/user-friends.svg'
]

export default {
    iconNames
}
</script>
