// quality of image by default
const IMAGE_QUALITY = 75
// proxy endpoint path for resize service
const CROP_ENDPOINT = 'cdn-cgi/image'

/**
 * resize() - URL generation with parameters for resizing
 *
 * @param {string}  url - Link to the original image
 * @param {number}  width - Width of the image, undefined by default
 * @param {object}  options - List of options for modify parameters for image. More info: https://developers.cloudflare.com/images/about/
 * */
const resize = (url, width, options) => {
    let parsedUrl = {}
    try {
        parsedUrl = new URL(url)
    } catch (e) {
        console.error(e)
    }

    return `${parsedUrl.origin}/${CROP_ENDPOINT}/${_getOptions(width, options)}${parsedUrl.pathname}`
}

// get string with paramentes
const _getOptions = (width, options) => {
    // save default quality of image
    let parameters = {
        q: IMAGE_QUALITY
    }
    // push width of the image if exists
    if (typeof width !== 'undefined' && parseInt(width) > 0) {
        parameters = Object.assign({ w: parseInt(width) }, parameters)
    }

    // apply custom options
    if (typeof options !== 'undefined') {
        Object.keys(options).forEach(function(key) {
            if (parameters.hasOwnProperty(key)) {
                parameters[key] = options[key]
            } else {
                parameters = Object.assign({ [key]: options[key] }, parameters)
            }
        })
    }

    // return formatted parameter
    return Object.keys(parameters)
        .map(function(key) {
            return `${key}=${parameters[key]}`
        })
        .join(',')
}

export default resize
