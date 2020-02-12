import { test } from 'rambdax'

const isAwesIoUiNamespace = test(/^@awes-io\/ui/)

export const hasAwesIoUiModule = (modules = []) =>
    modules.some(isAwesIoUiNamespace)

// const hasAwesIoUiCss = (css = []) => css.some(isAwesIoUiNamespace)

// export function shouldAddCss(options) {
//     const { css, modules } = options

//     return !hasAwesIoUiModule(modules) && !hasAwesIoUiCss(css)
// }
