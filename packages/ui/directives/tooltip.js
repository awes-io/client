import { createPopper } from '@popperjs/core'
import { isType, pathOr, omit, F } from 'rambdax'

const POPPERS = new Map()

function showTooltip() {
    const tooltip = this.__tooltip__
    const placement = tooltip.__placement__

    tooltip.setAttribute('data-visible', '')

    const popper = createPopper(this, tooltip, {
        placement,
        modifiers: [
            {
                name: 'arrow',
                options: { padding: 6 }
            },
            {
                name: 'preventOverflow',
                options: {
                    padding: 16
                }
            },
            {
                name: 'offset',
                options: { offset: [0, 6] }
            }
        ]
    })

    POPPERS.set(tooltip, popper)
}

function hideTooltip() {
    const tooltip = this.__tooltip__
    const popper = POPPERS.get(tooltip)

    popper.destroy()

    tooltip.removeAttribute('data-visible')
}

const EVENTS = [
    {
        names: ['mouseenter', 'focus'],
        handler: showTooltip
    },
    {
        names: ['mouseleave', 'blur'],
        handler: hideTooltip
    }
]

function toggleEvents(el, on = false) {
    const useMethod = on ? 'addEventListener' : 'removeEventListener'

    EVENTS.forEach(({ names, handler }) => {
        names.forEach(name => {
            el[useMethod](name, handler)
        })
    })
}

function createTooltip(content, options = {}, placement = 'top') {
    const tooltip = document.createElement('div')

    const cssClass = pathOr('', 'class', options)
    const onclick = pathOr(F, 'onclick', options)

    tooltip.__placement__ = placement

    tooltip.className = 'aw-tooltip ' + cssClass

    tooltip.onclick = onclick

    tooltip.innerHTML = content + '</span><span data-popper-arrow></span>'

    return tooltip
}

function unbind(el) {
    if (el.__tooltip__) {
        const tooltip = el.__tooltip__
        const popper = POPPERS.get(tooltip)

        // destroy popper
        if (popper) {
            popper.destroy()
            POPPERS.delete(tooltip)
        }

        // remove listeners
        toggleEvents(el, false)

        // remove tooltip
        if (tooltip.parentElement) {
            tooltip.parentElement.removeChild(tooltip)
        }

        // clear references
        tooltip.onclick = null
        delete tooltip.__placement__
        delete el.__tooltip__
    }
}

function bind(el, { value, arg, modifiers }) {
    // destroy if exists
    unbind(el)

    const content = isType('String', value)
        ? value
        : pathOr('', 'content', value)
    const options = isType('Object', value) ? omit('content', value) : {}

    if (content) {
        // create new tooltip
        el.__tooltip__ = createTooltip(content, options, arg)

        // append to body
        document.body.appendChild(el.__tooltip__)

        if (modifiers.show) {
            // show always
            showTooltip.call(el)
        } else {
            // add listeners
            toggleEvents(el, true)
        }
    }
}

export default {
    bind,
    update: bind,
    unbind
}
