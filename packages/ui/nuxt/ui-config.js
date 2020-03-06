export default {
    AwLink: {
        routerComponent: 'nuxt-link'
    },

    AwButton: {
        routerComponent: 'nuxt-link'
    },

    AwTableBuilder: {
        param: 'orderBy', // <-- GET-param name in browser query string
        ascTemplate: '%s', // <-- template, where '%s' is replaced with column name
        descTemplate: '%s_desc',
        default: false
    }
}
