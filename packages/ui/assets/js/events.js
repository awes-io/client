import { curry } from 'rambdax'

/**
 * Checks for click on interactive lement: <a> or <button>
 * to prevent redirect
 *
 * @param  {Array}     targetTags - array of tags, e.g. ['BUTTON', 'A']
 * @param  {HTMLEvent} $event     - event to check
 *
 * @return {Boolean} if this was a click on interactive element
 */
function _containsTargets(targetTags = [], $event) {
    let contains = false
    let eventTarget = $event.target

    const match = (el) => targetTags.includes(el.tagName)

    while (!contains && eventTarget) {
        if (match(eventTarget)) contains = true
        eventTarget = eventTarget.parentElement
    }

    return contains
}

/**
 * Wrap with R.curry before export
 */
export const containsTargets = curry(_containsTargets)

export const makePreventableEventMock = () => {
    const $event = Object.create(null)

    $event.name = 'aw-preventable'
    $event.target = null
    $event.isDefaultPrevented = false
    $event.preventDefault = function() {
        this.isDefaultPrevented = true
    }

    return $event
}

export const getEventTargetAttribute = ($event, attrName, bound = null) => {
    let el = $event.target

    if (el && el === bound) {
        return el.getAttribute(attrName)
    }

    while (el && el !== bound) {
        const val = el.getAttribute(attrName)

        if (val) {
            return val
        } else {
            el = el.parentElement
        }
    }

    return null
}
