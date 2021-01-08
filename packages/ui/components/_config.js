import { pathOr, isEmpty } from 'rambdax'
import { COLORS } from '../assets/js/constants'

export const LINK_REGEX = /^(https?:)?\/\//gm
export const SPECIAL_URL_REGEX = /tel:|mailto:/gm

export const AwLink = {
    routerComponent: 'router-link',
    baseClass: 'link'
}

export const AwAvatar = {
    colors: COLORS
}

export const AwButton = {
    routerComponent: 'router-link',
    baseClass: 'aw-button',
    size: 'md',
    color: 'success',
    theme: 'solid'
}

export const AwCropper = {
    baseClass: 'aw-cropper'
}

export const AwDate = {
    format: 'll'
}

export const AwDropdown = {
    tag: 'div',
    baseClass: 'aw-dropdown',
    popperOptions: {
        placement: 'bottom-start',
        modifiers: [
            {
                name: 'arrow',
                enabled: false
            },
            {
                name: 'flip',
                options: {
                    padding: 0,
                    behavior: 'flip',
                    boundariesElement: 'scrollParent'
                }
            },
            {
                name: 'preventOverflow',
                enabled: false
            },
            {
                name: 'hide',
                enabled: false
            },
            {
                name: 'computeStyles',
                options: {
                    adaptive: false
                }
            }
        ]
    }
}

export const AwCode = {
    baseClass: 'aw-text-field',
    pattern: 'XXX-XXX'
}

export const AwForm = {
    baseClass: 'aw-form',
    method: 'post',
    setErrors(errors) {
        const unsetErrors = {}

        Object.keys(errors).forEach((fieldName) => {
            const field = this.$el[fieldName]
            let text = errors[fieldName]

            if (Array.isArray(text)) text = text.join(' ')

            if (
                field &&
                typeof field.setCustomValidity === 'function' &&
                typeof Event === 'function'
            ) {
                field.setCustomValidity(text)
                field.dispatchEvent(new Event('invalid'))
            } else {
                unsetErrors[fieldName] = text
            }
        })

        if (!isEmpty(unsetErrors)) {
            this.errors = unsetErrors
        }
    },
    submit($event) {
        $event.preventDefault()
        this.errors = null

        const _tm = setTimeout(() => {
            this.loading = true
        }, 200)

        const form = $event.target
        const method = form.method.toLowerCase()
        const data = new FormData($event.target)
        const url = form.action

        let request = {
            url,
            method
        }

        if (method === 'get') {
            request.params = new URLSearchParams(data)
        } else {
            request.data = data
        }

        return this.$axios
            .request(request)
            .then((response) => {
                this.$emit('sended', response)

                return response
            })
            .catch((err) => {
                // set errors
                const errors = pathOr({}, 'response.data.errors', err)

                if (typeof this.setErrors === 'function') {
                    this.setErrors(errors)
                }

                // return value
                if (err.response) {
                    this.$emit('error', err.response)

                    return err.response
                }
            })
            .finally(() => {
                clearTimeout(_tm)
                this.loading = false
            })
    }
}

export const AwInput = {
    baseClass: 'aw-text-field',
    sizes: ['sm', 'md']
}

export const AwMoney = {
    options: {
        locale: undefined,
        currency: 'EUR',
        valueAsInteger: true,
        distractionFree: true,
        precision: undefined,
        autoDecimalMode: false,
        valueRange: undefined,
        allowNegative: true
    }
}

export const AwIconSystem = {
    baseClass: 'aw-icon',
    size: 16
}

export const AwPage = {
    titleTag: 'h1'
}

export const AwModal = {
    baseClass: 'aw-modal',
    stay: false,
    bgClickClose: true
}

export const AwMenu = {
    iconColor: 'currentColor'
}

export const AwTable = {
    orderable: {
        param: 'orderBy', // <-- GET-param name in browser query string
        ascTemplate: '%s', // <-- template, where '%s' is replaced with column name
        descTemplate: '%s_desc',
        // field: 'description',
        default: false
    }
}

export const AwTags = {
    colors: COLORS
}

export default {
    AwAvatar,
    AwButton,
    AwLink,
    AwCropper,
    AwDate,
    AwDropdown,
    AwCode,
    AwForm,
    AwInput,
    AwMoney,
    AwIconSystem,
    AwPage,
    AwModal,
    AwTable,
    AwTags
}
