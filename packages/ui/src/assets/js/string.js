import { split, reduce } from 'rambdax'

export const ucFirst = (text = '') => {
    return text.charAt(0).toUpperCase() + text.substr(1)
}

export const toPascal = (text = '') => {
    return reduce(
        (str, chunk) => (chunk ? str + ucFirst(chunk) : str),
        '',
        split('-', text)
    )
}
