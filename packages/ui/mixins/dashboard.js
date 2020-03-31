export default {
    props: {
        data: {
            type: Object,
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            default: ''
        },

        percent: {
            type: Boolean,
            default: false
        },

        colors: {
            type: Array,
            default: () => []
        }
    },

    _config: {
        baseClass: 'dashboard',
        colors: [
            '#594FCF',
            '#E0AB61',
            '#E45284',
            '#66C3D1',
            '#AF57DB',
            '#E29D5D',
            '#E68262',
            '#66C7B9',
            '#DA61D9',
            '#DF54BD',
            '#BF55CF',
            '#634EE3',
            '#9C55D3',
            '#834EE3',
            '#6086E3',
            '#66B9E4',
            '#5CBC98',
            '#9A6F66'
        ]
    },

    computed: {
        _isArrowPositive() {
            return this.data.total_diff > 0
        },

        _mergedColors() {
            if (this.colors.length) {
                return [
                    ...this.colors,
                    ...this.$options._config.colors.slice(this.colors.length)
                ]
            }
            return this.$options._config.colors
        }
    }
}
