import { test, isType } from 'rambdax'

const isAwesIoUiNamespace = test(/^@awes-io\/ui/)

export const hasAwesIoUiModule = (modules = []) =>
    modules.some(module => {
        const name = isType('Array', module) ? module[0] : module
        return isAwesIoUiNamespace(name)
    })

// const hasAwesIoUiCss = (css = []) => css.some(isAwesIoUiNamespace)

// export function shouldAddCss(options) {
//     const { css, modules } = options

//     return !hasAwesIoUiModule(modules) && !hasAwesIoUiCss(css)
// }
