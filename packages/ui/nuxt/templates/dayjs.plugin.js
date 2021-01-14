import Vue from 'vue'
import dayjs from 'dayjs'

/* eslint-disable */
<% ['dayjs/plugin/relativeTime', 'dayjs/plugin/customParseFormat', 'dayjs/plugin/localizedFormat'].concat(Array.isArray(options.dayjs.plugins) ? options.dayjs.plugins : []).forEach((plugin) => {
    const src = plugin.src || plugin
    const name = plugin.name || src.replace('dayjs/plugin/', '')
    const options = plugin.options || {}
%>
import <%=name%> from '<%=src%>'
dayjs.extend(<%=name%>, <%=JSON.stringify(options)%>)
<% }) %>

<% if (options.lang && Array.isArray(options.lang.locales)) { %>
    <% options.lang.locales.forEach((locale) => {
        const code = locale.code || locale
    %>
import dayjsLocale<%=code%> from 'dayjs/locale/<%=code%>.js'
dayjs.locale('<%=code%>', dayjsLocale<%=code%>)
    <% }) %>
<% } %>
/* eslint-enable */

// Next line fixes relative time plugin
if (dayjs.en) {
    dayjs.Ls.en = { ...dayjs.Ls.en, ...dayjs.en, weekStart: 1 }
}

// Switch to 'en' by default
dayjs.locale('en')

// Plugin for default string format
function defaultStringFormat(options, _dayjs) {
    // do not patch if no pattern provided
    if (!options.pattern) {
        return
    }

    const proto = _dayjs.prototype

    // parse all strings with given format, if not provided

    const _oldParse = proto.parse

    proto.parse = function(config) {
        const { date, args } = config
        const format = args[1]
        if (typeof date === 'string' && !format) {
            return _oldParse.call(this, { ...config, args: [ args[0], options.pattern ] })
        } else {
            return _oldParse.call(this, config)
        }
    }

    // format to given format if format string is empty

    if (options.format) {
        const _oldFormat = proto.format

        proto.format = function(formatString = options.pattern) {
            return _oldFormat.call(this, formatString)
        }
    }
}

dayjs.extend(defaultStringFormat, <%=JSON.stringify(options.dayjs.stringFormat)%>)

export default function({ app: { i18n } }, inject) {
    i18n.onLanguageSwitched(async newLocale => {
        dayjs.locale(newLocale)
    })

    dayjs.locale(i18n.locale)

    Vue.prototype.$dayjs = dayjs
    inject('dayjs', dayjs)
}
