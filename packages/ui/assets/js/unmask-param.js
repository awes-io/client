export default (str, value, mask = '%s') => {
    return str.split(mask).join(value)
}
