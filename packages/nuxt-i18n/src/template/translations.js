import axios from 'axios'
import { pathOr } from 'rambdax'

export default function({ req = {} }) {
    let protocol
    let domain = '<%=options.domain%>'

    if (process.client) {
        protocol = window.location.protocol
        domain = window.location.host
    } else {
        const byProtocol = pathOr('', 'protocol', req) === 'https'
        const byForwarded = pathOr('', 'headers.x-forwarded-proto', req).indexOf('https') !== -1
        protocol = byProtocol || byForwarded || <%=options.isHttps%> ? 'https:' : 'http:'
        domain = pathOr(domain, 'headers.host', req)
    }

    return new Promise(resolve => {
        axios
            .get(`${protocol}//${domain}<%=options.path%>`)
            .then(({ data }) => {
                <% if (options.dataPath) { %>
                resolve(pathOr({}, '<%=options.dataPath%>', data))
                <% } else { %>
                resolve(data)
                <% } %>
            })
            .catch(e => {
                console.log(`@awes-io/nuxt-i18n: fetching locale failed ${process.client ? 'on client' : 'on server'}`)
                console.log(e.request)
                resolve({})
            })
    })
}
