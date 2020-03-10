export default {
    methods: {
        _arrowFocusItem(offset = 0, $event) {
            if (!this.isOpened) return

            const buttons = Array.from(
                this.$el.querySelectorAll('[data-arrow-focus]')
            )
            const active = document.activeElement
            const activeIndex = buttons.indexOf(active)
            let nextIndex

            if (activeIndex < 0) {
                nextIndex = 0
            } else {
                nextIndex = activeIndex + offset
            }

            const button = buttons[nextIndex]

            if (button) {
                if ($event) {
                    $event.preventDefault()
                    $event.stopPropagation()
                }
                button.focus()
            }
        }
    }
}
