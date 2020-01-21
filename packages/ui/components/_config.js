import { pathOr, isEmpty } from 'rambdax'

export const AwLink = {
    routerComponent: 'router-link',
    baseClass: 'link'
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

export const AwDropdown = {
    tag: 'div',
    baseClass: 'aw-dropdown',
    popperOptions: {
        placement: 'bottom-start',
        modifiers: {
            arrow: {
                enabled: false
            },
            flip: {
                padding: 0,
                behavior: 'flip',
                boundariesElement: 'scrollParent'
            },
            preventOverflow: {
                enabled: false
            },
            hide: {
                enabled: false
            }
        }
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

        Object.keys(errors).forEach(fieldName => {
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
            .then(response => {
                this.$emit('sended', response)

                return response
            })
            .catch(err => {
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

export const AwIcon = {
    baseClass: 'aw-icon',
    size: 'base'
}

export const AwPage = {
    baseClass: 'aw-page',
    titleTag: 'h1'
}

export const AwModal = {
    baseClass: 'aw-modal',
    stay: false,
    bgClickClose: true
}

export default {
    AwButton,
    AwLink,
    AwCropper,
    AwDropdown,
    AwCode,
    AwForm,
    AwInput,
    AwIcon,
    AwPage,
    AwModal
}
