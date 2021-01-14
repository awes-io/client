import Vue from 'vue'
import { pathOr, fromPairs } from 'rambdax'

const screens = JSON.parse('<%= JSON.stringify(options.screens) %>')

const matchers = Object.keys(screens).map((name) => {
    const item = screens[name]
    let media = item.raw

    if (!media) {
        const min = pathOr(item, 'min', item)
        const max = pathOr(null, 'max', item)

        media = max
            ? `(min-width: ${min} and max-width: ${max})`
            : `(min-width: ${min})`
    }

    return { name, matcher: window.matchMedia(media) }
})

const $screen = new Vue.observable({
    ...fromPairs(matchers.map((m) => [m.name, m.matcher.matches]))
})

for (const i in matchers) {
    matchers[i].matcher.addListener((e) => {
        $screen[matchers[i].name] = e.matches
    })
}

Vue.prototype.$screen = $screen

export default (ctx, inject) => {
    inject('screen', $screen)
}
