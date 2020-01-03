export function preventPinchResize(enable) {
    // prevent zoom in Safari
    document[enable ? 'addEventListener' : 'removeEventListener'](
        'touchmove',
        onZoom,
        false
    )

    // prevent zoom in other browsers
    if (enable) {
        let viewportMeta = document.querySelector('meta[name="viewport"]')

        if (viewportMeta) {
            let _currentValue = viewportMeta.content
            viewportMeta.setAttribute('data-old', _currentValue)
            let newValue =
                _currentValue.replace(/,? ?user-scalable=(yes|no)/, '') +
                ', user-scalable=no'
            viewportMeta.content = newValue
        } else {
            viewportMeta = document.createElement('META')
            viewportMeta.name = 'viewport'
            viewportMeta.content = 'user-scalable=no'
            document.head.appendChild(viewportMeta)
        }

        // disable
    } else {
        let viewportMeta = document.querySelector('meta[name="viewport"]')
        let oldValue = viewportMeta.getAttribute('data-old')

        if (oldValue) {
            viewportMeta.content = oldValue
            viewportMeta.removeAttribute('data-old')
        } else {
            viewportMeta.parentElement.removeChild(viewportMeta)
        }
    }
}

export function onZoom($event) {
    if ($event.scale !== 1) {
        $event.preventDefault()
    }
}
