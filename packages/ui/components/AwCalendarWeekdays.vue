<script>
export default {
    name: 'AwCalendarWeekdays',

    functional: true,

    props: {
        firstDay: {
            type: Number,
            default: 1
        },

        weekdayNames: {
            type: Array,
            required: true
        }
    },

    render(h, { props }) {
        const { firstDay, weekdayNames } = props
        const sortedNames = weekdayNames
            .slice(firstDay)
            .concat(weekdayNames.slice(0, firstDay))

        return sortedNames.map(name =>
            h('span', { key: name, staticClass: 'aw-calendar__weekday' }, name)
        )
    }
}
</script>
