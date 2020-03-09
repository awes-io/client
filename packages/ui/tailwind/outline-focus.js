module.exports = function({ theme, addUtilities }) {
    const focusOutline = theme('focusOutline')

    if (!focusOutline) return

    addUtilities({
        '.focus-outline:focus': {
            outline: 'none'
        },
        '.focus-outline > [tabindex="-1"]:focus': {
            outline: 'none'
        },
        '.focus-outline:focus > [tabindex="-1"]': {
            outline: focusOutline
        }
    })
}
