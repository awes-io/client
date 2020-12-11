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

export const hashStringToIndex = (str, limit) => {
    limit = +limit || 0

    let hash = 0

    if (typeof str !== 'string' || !str.length) return null

    if (limit < 2) return 0

    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
        hash = hash & hash
    }

    hash = ((hash % limit) + limit) % limit

    return hash
}
