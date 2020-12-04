import { createPopper } from '@popperjs/core'
import { isType, pathOr, omit, F, clone, equals } from 'rambdax'

const POPPERS = new Map()

function showTooltip() {
    const tooltip = this.__tooltip__
    const placement = tooltip.__placement__
    const options = tooltip.__options__

    tooltip.setAttribute('data-visible', '')

    const modifiers = [
        // {
        //     name: 'arrow',
        //     options: { padding: 6 }
        // },
        {
            name: 'preventOverflow',
            options: {
                padding: 16
            }
        }
    ]

    const offset = pathOr([0, 6], 'offset', options)

    if (offset) {
        modifiers.push({
            name: 'offset',
            options: { offset }
        })
    }

    const popper = createPopper(this, tooltip, {
        placement,
        modifiers
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

function toggleEvents(el, on = false, $events = EVENTS) {
    const useMethod = on ? 'addEventListener' : 'removeEventListener'

    $events.forEach(({ names, handler }) => {
        names.forEach(name => {
            el[useMethod](name, handler)
        })
    })
}

function _updateTooltipContent(tooltip, content) {
    tooltip.__content__ = content

    tooltip.innerHTML = content // + '</span><span data-popper-arrow></span>'

    return tooltip
}

function createTooltip(content, options, placement) {
    const tooltip = document.createElement('div')

    return updateTooltip(tooltip, content, options, placement)
}

function updateTooltip(tooltip, content, options, placement) {
    let cssClass = pathOr('', 'class', options)
    const id = pathOr(null, 'id', options)
    const onclick = pathOr(F, 'onclick', options)

    if (isType('Function', onclick)) {
        cssClass += ' cursor-pointer'
        tooltip.onclick = onclick
    }

    tooltip.__placement__ = placement

    tooltip.__options__ = clone(options)

    tooltip.className = 'aw-tooltip ' + cssClass

    if (id) {
        tooltip.setAttribute('id', id)
    }

    _updateTooltipContent(tooltip, content)

    return tooltip
}

function _getContent(value) {
    return isType('String', value) ? value : pathOr('', 'content', value)
}

function _getOptions(value) {
    return isType('Object', value) ? omit('content', value) : {}
}

function unbind(el) {
    if (el.__tooltip__) {
        // prevent async binding
        clearTimeout(el.__async_tooltip__)

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
        delete tooltip.__options__
        delete tooltip.__content__
        delete el.__tooltip__
        delete el.__async_tooltip__
    }
}

function bind(el, { value, arg = 'top', modifiers }) {
    const content = _getContent(value)

    if (content) {
        const options = _getOptions(value)

        // create new tooltip
        el.__tooltip__ = createTooltip(content, options, arg)

        if (modifiers.prepend) {
            // insert before parent asynchronously
            el.__async_tooltip__ = setTimeout(() => {
                el.parentElement.insertBefore(el.__tooltip__, el)
                POPPERS.get(el.__tooltip__).update()
            }, 10)
        } else {
            // append to body
            document.body.appendChild(el.__tooltip__)
        }

        if (modifiers.show) {
            // show always
            showTooltip.call(el)
        } else {
            // add listeners
            toggleEvents(el, true)
        }
    }
}

function update(el, { value, arg = 'top', modifiers }) {
    const content = _getContent(value)

    // create if not exist
    if (content && !el.__tooltip__) {
        bind(el, { value, arg, modifiers })
        return
    }

    // remove if no content
    if (!content) {
        unbind(el)
        return
    }

    // rebuild tooltip
    const options = _getOptions(value)

    if (
        arg !== el.__tooltip__.__placement__ ||
        !equals(options, el.__tooltip__.__options__)
    ) {
        updateTooltip(el.__tooltip__, content, options, arg)
        return
    }

    // update content
    if (content !== el.__tooltip__.__content__) {
        _updateTooltipContent(el.__tooltip__, content)
    }
}

export default {
    bind,
    update,
    unbind
}
