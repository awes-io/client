<script>
const FRAME_BARS = [
    { class: 'w-2 h-full left-0 top-0' },
    { class: 'w-2 h-full right-0 top-0' },
    { class: 'h-2 w-full left-0 top-0' },
    { class: 'h-2 w-full left-0 bottom-0' }
]

export const OFFLINE_FRAME_ID = '__offline-frame__'

export default {
    name: 'AwOfflineFrame',

    functional: true,

    render(h) {
        return h(
            'div',
            {
                attrs: { id: OFFLINE_FRAME_ID },
                staticStyle: { display: 'none' }
            },
            FRAME_BARS.map(bar =>
                h('div', {
                    staticClass: `${bar.class} fixed bgcolor-error z-100`
                })
            )
        )
    }
}
</script>
