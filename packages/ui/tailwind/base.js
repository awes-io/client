module.exports = function({ addBase }) {
    addBase({
        'html, body': {
            '-webkit-tap-highlight-color': 'transparent',
            color: 'var(--c-on-surface)',
            backgroundColor: 'var(--c-surface)',
            'scrollbar-width': 'thick',
            'scrollbar-color': 'var(--c-fade-surface) transparent',
            '&::-webkit-scrollbar': {
                width: '6px',
                height: '6px',
                backgroundColor: 'transparent'
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'var(--c-fade-surface)'
            }
        },
        button: {
            textAlign: 'inherit'
        }
        // 'button:focus': {
        //     outline: 'none'
        // }
    })
}
