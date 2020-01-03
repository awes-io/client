import loadjs from 'loadjs'
import { filter, isEmpty, toPairs, join, map, not, compose } from 'rambdax'

const GOOGLE_MAPS_ID = 'google-maps'

export default {
    props: {
        gmKey: {
            type: String,
            required: true
        },

        gmLibraries: {
            type: Array,
            default: () => ['places']
        },

        gmLanguage: {
            type: String,
            default: ''
        }
    },

    computed: {
        gmLibUrl() {
            const base = '//maps.googleapis.com/maps/api/js'
            const params = {
                key: this.gmKey,
                libraries: this.gmLibraries.join(','),
                language: this.gmLanguage
            }

            const libParams = join(
                '&',
                map(join('='), toPairs(filter(compose(not, isEmpty), params)))
            )

            return `${base}?${libParams}`
        }
    },

    methods: {
        gmInit() {
            return loadjs([this.gmLibUrl], GOOGLE_MAPS_ID, {
                returnPromise: true
            })
        },

        isGmInited() {
            return loadjs.isDefined(GOOGLE_MAPS_ID)
        }
    }
}
